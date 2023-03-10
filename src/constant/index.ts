
export const NLP_URL = '';//NLP接口地址
export const NLP_METHOD = 'GET';//请求方式


//伪造的假数据提供页面效果
export const MOCK_DATA = [
    'func = lambda size, kernel=3, stride=1, padding=0: ((size - kernel + 2 * padding) / stride + 1)\n' +
    '        x = func(func(self.options[1]), kernel=2)\n' +
    '        x = func(func(x), kernel=2)\n' +
    '        x = func(func(x), kernel=2)\n' +
    '        x = func(func(x), kernel=2)\n' +
    '\n' +
    '        y = func(func(self.options[2]), kernel=2)\n' +
    '        y = func(func(y), kernel=2)\n' +
    '        y = func(func(y), kernel=2)\n' +
    '        y = func(func(y), kernel=2)\n' +
    '\n' +
    '        x = int(x)\n' +
    '        y = int(y)\n','class CNN(nn.Module):\n' +
    '    def __init__(self, channels, width, height, classes, device=\'cpu\'):\n' +
    '        super().__init__()\n' +
    '\n' +
    '        self.options = [channels, width, height, classes, device]\n' +
    '\n' +
    '        self.conv1 = nn.Sequential(\n' +
    '            nn.Conv2d(in_channels=channels, out_channels=16, kernel_size=3, stride=1),\n' +
    '            nn.BatchNorm2d(16),\n' +
    '            nn.ReLU(),\n' +
    '            nn.MaxPool2d(kernel_size=2, stride=1)\n' +
    '        )\n' +
    '\n' +
    '        self.conv2 = nn.Sequential(\n' +
    '            nn.Conv2d(in_channels=16, out_channels=32, kernel_size=3, stride=1),\n' +
    '            nn.BatchNorm2d(32),\n' +
    '            nn.ReLU(),\n' +
    '            nn.MaxPool2d(kernel_size=2, stride=1)\n' +
    '        )\n' +
    '\n' +
    '        self.conv3 = nn.Sequential(\n' +
    '            nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, stride=1),\n' +
    '            nn.BatchNorm2d(64),\n' +
    '            nn.ReLU(),\n' +
    '            nn.AvgPool2d(kernel_size=2, stride=1)\n' +
    '        )\n' +
    '\n' +
    '        self.conv4 = nn.Sequential(\n' +
    '            nn.Conv2d(in_channels=64, out_channels=128, kernel_size=3, stride=1),\n' +
    '            nn.BatchNorm2d(128),\n' +
    '            nn.ReLU(),\n' +
    '            nn.AvgPool2d(kernel_size=2, stride=1)\n' +
    '        )\n' +
    '\n' +
    '        func = lambda size, kernel=3, stride=1, padding=0: ((size - kernel + 2 * padding) / stride + 1)\n' +
    '        x = func(func(self.options[1]), kernel=2)\n' +
    '        x = func(func(x), kernel=2)\n' +
    '        x = func(func(x), kernel=2)\n' +
    '        x = func(func(x), kernel=2)\n' +
    '\n' +
    '        y = func(func(self.options[2]), kernel=2)\n' +
    '        y = func(func(y), kernel=2)\n' +
    '        y = func(func(y), kernel=2)\n' +
    '        y = func(func(y), kernel=2)\n' +
    '\n' +
    '        x = int(x)\n' +
    '        y = int(y)\n' +
    '\n' +
    '        self.mlp = nn.Sequential(\n' +
    '            nn.Linear(128 * x * y, 1000),\n' +
    '            nn.Linear(1000, 1000),\n' +
    '            nn.Linear(1000, 100),\n' +
    '            nn.Linear(100, self.options[3])\n' +
    '        )\n' +
    '\n' +
    '        self = self.to(self.options[4])\n' +
    '\n' +
    '    def forward(self, data):\n' +
    '        data = data.to(self.options[4])  # 将向量转移到设备上\n' +
    '        data = self.conv1(data)\n' +
    '        data = self.conv2(data)\n' +
    '        data = self.conv3(data)\n' +
    '        data = self.conv4(data)\n' +
    '        data = data.view(data.size(0), -1)\n' +
    '        data = self.mlp(data)\n' +
    '        return data\n','data_tf = torchvision.transforms.Compose(\n' +
    '    [\n' +
    '        torchvision.transforms.ToTensor(),\n' +
    '        torchvision.transforms.Normalize([0.5], [0.5])\n' +
    '    ]\n' +
    ')\n' +
    '\n' +
    'data_path = r\'data/minist\'  # minist数据集的下载路径\n' +
    '# 获取数据集\n' +
    'train_data = mnist.MNIST(data_path, train=True, transform=data_tf, download=False)\n' +
    'test_data = mnist.MNIST(data_path, train=False, transform=data_tf, download=False)\n' +
    'train_loader = data.DataLoader(train_data, batch_size=128, shuffle=True)\n' +
    'test_loader = data.DataLoader(test_data, batch_size=128, shuffle=True)\n'
];



