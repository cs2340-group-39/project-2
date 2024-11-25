import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { UsersLayout } from "@/components/layouts/users-layout";

function ImageBlock({ src, alt, name, description }) {
    return (
        <div style={{ textAlign: "center", padding: "10px", maxWidth: "300px", margin: "0 auto" }}>
            <img 
                src={src} 
                alt={alt} 
                style={{ width: "300px", height: "auto", borderRadius: "8px" }} 
            />
            <h3 style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>{name}</h3>
            <p 
                style={{ 
                    marginTop: "5px", 
                    fontSize: "14px", 
                    color: "#555", 
                    wordWrap: "break-word", 
                    width: "300px" 
                }}
            >
                {description}
            </p>
        </div>
    );
}

export default async function Page() {
    const supabase = await createClient();
    const images = [
        { src: "/johnny.jpeg", alt: "Johnny" },
        { src: "/arjun.jpeg", alt: "Arjun" },
        { src: "/will.jpeg", alt: "Will" },
        { src: "/saad.jpeg", alt: "Saad" },
        { src: "/nicholas.jpeg", alt: "Nicholas" }
    ];

    const names = [
        "Johnny", "Arjun", "Will", "Saad", "Nicholas"
    ];
    
    const descriptions = [
        "I'm a junior studying Computer Science at Georgia Tech and interested in Android App Development and Cybersecurity! I’m also a Codepath Student where I have completed many courses that go in-depth into the concepts of Android Development and Cybersecurity.​", 
        "Hello, my name is Arjun! I am a sophomore computer science major and my threads are Intelligence and Mod/Sim. I am very passionate about computer simulations, artificial intelligence, and biking. This project has greatly helped me build my team building skills", 
        "Hello, my name is Will! I'm a second year computer science major with concentrations in Intelligence and System Architecture. Some of my hobbies include golfing, working out, and cooking. Throughout this project, I have gained important web development and team skills, preparing me for real world work.", 
        "Hey, I'm Saad and I am a 3rd year Computer Engineering major.", 
        "Hi, I'm Nicholas Nitsche. I have a passion for playing tennis; there's something exhilarating about the competition and the skill involved in each match. I love the way it challenges me both physically and mentally. In addition to tennis, I'm also an avid gamer. I enjoy immersing myself in different virtual worlds and experiencing the stories and challenges they offer. Whether I'm playing competitively or just for fun, video games provide a great way to unwind and connect with friends. Balancing both sports and gaming keeps my life exciting and engaging!"
    ];

    const {
        data: { user },
    } = await supabase.auth.getUser();

    //if (user) {
     //   return redirect("/users/login");
    //}

    return (
        <UsersLayout>
         <main
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                    alignItems: "center",
                    padding: "80px 20px 20px",
                    boxSizing: "border-box",
                    width: "100%"
                }}
            >
                {images.map((image, index) => {
                    if (index % 2 === 0) {
                        return (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    gap: "40px", 
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <ImageBlock src={image.src} alt={image.alt} name={names[index]} description={descriptions[index]}/>
                                {images[index + 1] && <ImageBlock src={images[index + 1].src} alt={images[index + 1].alt} name={names[index + 1]} description={descriptions[index + 1]}/>}
                            </div>
                        );
                    }
                    return null;
                })}
            </main>
        </UsersLayout>
    );
}
