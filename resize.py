from PIL import Image

# Ouvrir l'image
image_path = "photos/Linux.png"
output_path = "./photos/Linux_resized.png"

# Redimensionner l'image à 512x512 pixels
image = Image.open(image_path)
resized_image = image.resize((512, 512), Image.ANTIALIAS)

# Enregistrer l'image redimensionnée
resized_image.save(output_path)

# Retourner le chemin de l'image redimensionnée
output_path