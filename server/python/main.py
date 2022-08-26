from distutils.log import warn
import torch
import torch.nn as nn
from torch.autograd import Variable
from torchvision.models import googlenet
from torchvision.transforms import transforms
from PIL import Image
import base64
from io import BytesIO
import sys
import warnings
warnings.filterwarnings("ignore")


checkpoint = torch.load("python/model.pt")
model = googlenet(pretrained=True)

num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, 10)
model.load_state_dict(checkpoint)
model.eval()


def predict_image(image_path):
    transformation = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.6941, 0.5490, 0.4671],
                             [0.2903, 0.3704, 0.4086])
    ])
    image_tensor = transformation(image_path)
    image_tensor = image_tensor.unsqueeze_(0)
    image_tensor.cpu()

    input = Variable(image_tensor)
    output = model(input)

    index = output.data.numpy().argmax()
    return index


classes = {
    0: 'Apple',
    1: 'Avocado',
    2: 'Banana',
    3: 'Eggplant',
    4: 'Lemon',
    5: 'Onion',
    6: 'Orange',
    7: 'Pepper',
    8: 'Potato',
    9: 'Tomato'
}

im_b64 = sys.argv[1]
# im_b64 = im_b64.split(',')[1]
im_b64 = base64.b64decode(im_b64)
im_b64 = BytesIO(im_b64)
im_b64 = Image.open(im_b64)
image = im_b64.convert('RGB')

prediction = predict_image(image)
print(prediction)
sys.stdout.flush()
