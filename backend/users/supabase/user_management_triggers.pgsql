-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS tg_on_supabase_user_create ON auth.users;

DROP TRIGGER IF EXISTS tg_on_supabase_user_delete ON auth.users;

DROP TRIGGER IF EXISTS tg_on_supabase_user_update ON auth.users;

DROP TRIGGER IF EXISTS tg_on_supabase_user_email_confirm ON auth.users;

-- Create function for handling user creation
CREATE OR REPLACE FUNCTION fn_create_db_user_on_supabase_user_create()
    RETURNS TRIGGER
    SECURITY DEFINER
    AS $$
BEGIN
    INSERT INTO private.users_supabaseuser(uuid, email, PASSWORD, username, is_staff, is_active, is_superuser, created_at)
        VALUES(NEW.id, NEW.email, concat('bcrypt$', NEW.encrypted_password), NEW.id::text, FALSE, FALSE, FALSE, now())
    ON CONFLICT
        DO NOTHING;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Create function for handling user deletion
CREATE OR REPLACE FUNCTION fn_delete_db_user_on_supabase_user_delete()
    RETURNS TRIGGER
    SECURITY DEFINER
    AS $$
BEGIN
    DELETE FROM private.users_supabaseuser
    WHERE uuid = OLD.id;
    RETURN OLD;
END;
$$
LANGUAGE plpgsql;

-- Create function for handling user updates
CREATE OR REPLACE FUNCTION fn_update_db_user_on_supabase_user_update()
    RETURNS TRIGGER
    SECURITY DEFINER
    AS $$
BEGIN
    -- Only update if email or password has changed
    IF(NEW.email <> OLD.email OR NEW.encrypted_password <> OLD.encrypted_password) THEN
        UPDATE
            private.users_supabaseuser
        SET
            email = NEW.email,
            PASSWORD = CASE WHEN NEW.encrypted_password <> OLD.encrypted_password THEN
                concat('bcrypt$', NEW.encrypted_password)
            ELSE
                PASSWORD
            END,
            username = coalesce(NEW.raw_user_meta_data ->> 'username', username),
            updated_at = now()
        WHERE
            uuid = NEW.id;
    END IF;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Create function for handling email confirmation
CREATE OR REPLACE FUNCTION fn_set_db_user_active_on_supabase_user_email_confirm()
    RETURNS TRIGGER
    SECURITY DEFINER
    AS $$
BEGIN
    IF(OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL) THEN
        UPDATE
            private.users_supabaseuser
        SET
            is_active = TRUE
        WHERE
            uuid = NEW.id;
    END IF;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER tg_on_supabase_user_create
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION fn_create_db_user_on_supabase_user_create();

CREATE TRIGGER tg_on_supabase_user_delete
    BEFORE DELETE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION fn_delete_db_user_on_supabase_user_delete();

CREATE TRIGGER tg_on_supabase_user_update
    AFTER UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION fn_update_db_user_on_supabase_user_update();

CREATE TRIGGER tg_on_supabase_user_email_confirm
    AFTER UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION fn_set_db_user_active_on_supabase_user_email_confirm();

