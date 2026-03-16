from django.db import models
from cloudinary.models import CloudinaryField
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
from PIL import Image


# VALIDATE IMAGE SIZE
def validate_image_size(image):

    max_size = 1 * 1024 * 1024   # 1MB

    if image.size > max_size:
        raise ValidationError("Image must be less than 1MB")


class Product(models.Model):

    name = models.CharField(max_length=200)

    price = models.IntegerField()
    
    image = CloudinaryField(
        'image',
        folder='products'
        
    )


    def __str__(self):
        return self.name

