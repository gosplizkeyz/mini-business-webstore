from django.db import models
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

    image = models.ImageField(
        upload_to='products/',
        validators=[
            FileExtensionValidator(
                allowed_extensions=['jpg', 'jpeg', 'png', 'jfif']
            ),
            validate_image_size
        ],
        help_text="Upload JPG, PNG or JFIF image under 1MB (800x800 recommended)"
    )


    def __str__(self):
        return self.name


    # AUTO RESIZE IMAGE
    def save(self, *args, **kwargs):

        super().save(*args, **kwargs)

        img = Image.open(self.image.path)

        max_size = (800, 800)

        if img.height > 800 or img.width > 800:

            img.thumbnail(max_size)

            img.save(self.image.path)