from typing import Any, Optional, Type

from django.core.exceptions import ValidationError
from django.db import models
from pydantic import BaseModel


class PydanticJSONField(models.JSONField):
  def __init__(
    self,
    *args,
    pydantic_model: Optional[Type[BaseModel]] = None,
    **kwargs,
  ):
    self.pydantic_model = pydantic_model
    super().__init__(*args, **kwargs)

  def validate(self, value: Any, model_instance) -> None:
    if isinstance(value, self.pydantic_model):
      value = value.model_dump()
    super().validate(value, model_instance)
    try:
      self.pydantic_model(**value)
    except Exception as e:
      raise ValidationError(f"Invalid data format: {str(e)}")

  def pre_save(self, model_instance, add):
    value = getattr(model_instance, self.attname)
    if value:
      if isinstance(value, self.pydantic_model):
        value = value.model_dump()
      try:
        validated = self.pydantic_model(**value)
        value = validated.model_dump()
        setattr(model_instance, self.attname, value)
      except Exception as e:
        raise ValidationError(f"Invalid data format: {str(e)}")
    return value

  def to_python(self, value):
    value = super().to_python(value)
    if value is not None:
      try:
        validated = self.pydantic_model(**value)
        return validated.model_dump()
      except Exception as e:
        raise ValidationError(f"Invalid data format: {str(e)}")
    return value

  def from_db_value(self, value, expression, connection):
    value = super().from_db_value(value, expression, connection)
    if value is not None:
      try:
        validated = self.pydantic_model(**value)
        return validated.model_dump()
      except Exception as e:
        raise ValidationError(f"Invalid data format: {str(e)}")
    return value

  def get_prep_value(self, value):
    if value is None:
      return value
    if isinstance(value, self.pydantic_model):
      value = value.model_dump()
    return super().get_prep_value(value)
