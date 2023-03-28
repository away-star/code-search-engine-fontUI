import {CodeData} from "@/layouts";

export const NLP_URL = '/api/result';//NLP接口地址
export const NLP_METHOD = 'GET';//请求方式

// interface CodeData {
//     code: string;
//     similar: string
// }

//伪造的假数据提供页面效果
export const MOCK_DATA_python_merge: CodeData[] = [
    {
        code: ">>> pycon = {2016: \"Portland\", 2018: \"Cleveland\"}\n" +
            ">>> europython = {2017: \"Rimini\", 2018: \"Edinburgh\", 2019: \"Basel\"}\n" +
            "\n" +
            ">>> pycon | europython\n" +
            "{2016: 'Portland', 2018: 'Edinburgh', 2017: 'Rimini', 2019: 'Basel'}\n" +
            "\n" +
            ">>> pycon |= europython\n" +
            ">>> pycon\n" +
            "{2016: 'Portland', 2018: 'Edinburgh', 2017: 'Rimini', 2019: 'Basel'}",
        similar: '93.654%'
    },
    {
        code: ">>> x = {'a':1, 'b': 2}\n" +
            ">>> y = {'b':10, 'c': 11}\n" +
            ">>> x, z = dict(x), x.update(y) or x\n" +
            ">>> x\n" +
            "{'a': 1, 'b': 2}\n" +
            ">>> y\n" +
            "{'c': 11, 'b': 10}\n" +
            ">>> z\n" +
            "{'a': 1, 'c': 11, 'b': 10}",
        similar: "87.269%"
    },
    {
        code: ">>> d = {'spam': 1, 'eggs': 2, 'cheese': 3}\n" +
            ">>> e = {'cheese': 'cheddar', 'aardvark': 'Ethel'}\n" +
            ">>> d | e\n" +
            "{'spam': 1, 'eggs': 2, 'cheese': 'cheddar', 'aardvark': 'Ethel'}",
        similar: "82.635%"
    },
    {
        code: "class MergeDict(object):\n" +
            "  def __init__(self, *originals):\n" +
            "    self.originals = ({},) + originals[::-1]  # reversed\n" +
            "\n" +
            "  def __getitem__(self, key):\n" +
            "    for original in self.originals:\n" +
            "      try:\n" +
            "        return original[key]\n" +
            "      except KeyError:\n" +
            "        pass\n" +
            "    raise KeyError(key)\n" +
            "\n" +
            "  def __setitem__(self, key, value):\n" +
            "    self.originals[0][key] = value\n" +
            "\n" +
            "  def __iter__(self):\n" +
            "    return iter(self.keys())\n" +
            "\n" +
            "  def __repr__(self):\n" +
            "    return '%s(%s)' % (\n" +
            "      self.__class__.__name__,\n" +
            "      ', '.join(repr(original)\n" +
            "          for original in reversed(self.originals)))\n" +
            "\n" +
            "  def __str__(self):\n" +
            "    return '{%s}' % ', '.join(\n" +
            "        '%r: %r' % i for i in self.iteritems())\n" +
            "\n" +
            "  def iteritems(self):\n" +
            "    found = set()\n" +
            "    for original in self.originals:\n" +
            "      for k, v in original.iteritems():\n" +
            "        if k not in found:\n" +
            "          yield k, v\n" +
            "          found.add(k)\n" +
            "\n" +
            "  def items(self):\n" +
            "    return list(self.iteritems())\n" +
            "\n" +
            "  def keys(self):\n" +
            "    return list(k for k, _ in self.iteritems())\n" +
            "\n" +
            "  def values(self):\n" +
            "    return list(v for _, v in self.iteritems())",
        similar: "79.362%"
    },
    {
        code: ">>> from functools import reduce\n" +
            ">>> l = [{'a': 1}, {'b': 2}, {'a': 100, 'c': 3}]\n" +
            ">>> reduce(lambda x, y: {**x, **y}, l, {})\n" +
            "{'a': 100, 'b': 2, 'c': 3}",
        similar: "75.466%"
    },
];


export const MOCK_DATA_python_quick: CodeData[] = [
    {
        code: "def sort(array):\n" +
            "    \"\"\"Sort the array by using quicksort.\"\"\"\n" +
            "\n" +
            "    less = []\n" +
            "    equal = []\n" +
            "    greater = []\n" +
            "\n" +
            "    if len(array) > 1:\n" +
            "        pivot = array[0]\n" +
            "        for x in array:\n" +
            "            if x < pivot:\n" +
            "                less.append(x)\n" +
            "            elif x == pivot:\n" +
            "                equal.append(x)\n" +
            "            elif x > pivot:\n" +
            "                greater.append(x)\n" +
            "        # Don't forget to return something!\n" +
            "        return sort(less)+equal+sort(greater)  # Just use the + operator to join lists\n" +
            "    # Note that you want equal ^^^^^ not pivot\n" +
            "    else:  # You need to handle the part at the end of the recursion - when you only have one element in your array, just return the array.\n" +
            "        return array",
        similar: "89.865%"
    },
    {
        code: "array = [97, 200, 100, 101, 211, 107]\n" +
            "quicksort(array)\n" +
            "print(array)\n" +
            "# array -> [97, 100, 101, 107, 200, 211]" +
            "def partition(array, begin, end):\n" +
            "    pivot = begin\n" +
            "    for i in range(begin+1, end+1):\n" +
            "        if array[i] <= array[begin]:\n" +
            "            pivot += 1\n" +
            "            array[i], array[pivot] = array[pivot], array[i]\n" +
            "    array[pivot], array[begin] = array[begin], array[pivot]\n" +
            "    return pivot\n" +
            "\n" +
            "\n" +
            "\n" +
            "def quicksort(array, begin=0, end=None):\n" +
            "    if end is None:\n" +
            "        end = len(array) - 1\n" +
            "    def _quicksort(array, begin, end):\n" +
            "        if begin >= end:\n" +
            "            return\n" +
            "        pivot = partition(array, begin, end)\n" +
            "        _quicksort(array, begin, pivot-1)\n" +
            "        _quicksort(array, pivot+1, end)\n" +
            "    return _quicksort(array, begin, end)",
        similar: "87.121%"
    },
    {
        code: "def qsort(arr):\n" +
            "    if len(arr) <= 1:\n" +
            "        return arr\n" +
            "    else:\n" +
            "        return qsort([x for x in arr[1:] if x < arr[0]])\n" +
            "        + [arr[0]]\n" +
            "        + qsort([x for x in arr[1:] if x >= arr[0]])",
        similar: "85.951%"
    },
    {
        code: "import random\n" +
            "\n" +
            "def qsort(xs, fst, lst):\n" +
            "    '''\n" +
            "    Sort the range xs[fst, lst] in-place with vanilla QuickSort\n" +
            "\n" +
            "    :param xs:  the list of numbers to sort\n" +
            "    :param fst: the first index from xs to begin sorting from,\n" +
            "                must be in the range [0, len(xs))\n" +
            "    :param lst: the last index from xs to stop sorting at\n" +
            "                must be in the range [fst, len(xs))\n" +
            "    :return:    nothing, the side effect is that xs[fst, lst] is sorted\n" +
            "    '''\n" +
            "    if fst >= lst:\n" +
            "        return\n" +
            "\n" +
            "    i, j = fst, lst\n" +
            "    pivot = xs[random.randint(fst, lst)]\n" +
            "\n" +
            "    while i <= j:\n" +
            "        while xs[i] < pivot:\n" +
            "            i += 1\n" +
            "        while xs[j] > pivot:\n" +
            "            j -= 1\n" +
            "\n" +
            "        if i <= j:\n" +
            "            xs[i], xs[j] = xs[j], xs[i]\n" +
            "            i, j = i + 1, j - 1\n" +
            "    qsort(xs, fst, j)\n" +
            "    qsort(xs, i, lst)",
        similar: "81.346%"
    },
    {
        code: "def qsort(xs):\n" +
            "    if not xs: return xs # empty sequence case\n" +
            "    pivot = xs[random.choice(range(0, len(xs)))]\n" +
            "\n" +
            "    head = qsort([x for x in xs if x < pivot])\n" +
            "    tail = qsort([x for x in xs if x > pivot])\n" +
            "    return head + [x for x in xs if x == pivot] + tail",
        similar: "80.331%"
    },

]

export const MOCK_DATA_sql_delete: CodeData[] = [
    {
        code: "DELETE w\n" +
            "FROM WorkRecord2 w\n" +
            "INNER JOIN Employee e\n" +
            "  ON EmployeeRun=EmployeeNo\n" +
            "WHERE Company = '1' AND Date = '2013-05-06'",
        similar: "91.364%"
    },
    {
        code: "   DELETE WorkRecord2 \n" +
            "      FROM WorkRecord2 \n" +
            "INNER JOIN Employee \n" +
            "        ON EmployeeRun=EmployeeNo\n" +
            "     WHERE Company = '1' \n" +
            "       AND Date = '2013-05-06';",
        similar: "87.936%"
    },
    {
        code: "DELETE FROM dbo.WorkRecord2\n" +
            "WHERE EmployeeRun IN (\n" +
            "    SELECT e.EmployeeNo\n" +
            "    FROM dbo.Employee e\n" +
            "    WHERE ...\n" +
            ")",
        similar: "86.215%"
    },
    {
        code: "DELETE FROM WorkRecord2 \n" +
            "       FROM Employee \n" +
            "Where EmployeeRun=EmployeeNo\n" +
            "      And Company = '1' \n" +
            "      AND Date = '2013-05-06'",
        similar: "80.311%"
    },
    {
        code: "SELECT Contact.Naam_Contactpersoon, Bedrijf.BedrijfsNaam, Bedrijf.Adres, Bedrijf.Postcode\n" +
            "FROM Contact\n" +
            "INNER JOIN Bedrijf ON Bedrijf.IDBedrijf = Contact.IDbedrijf",
        similar: "77.654%"
    },
]

export const MOCK_DATA_sql_duplicate: CodeData[] = [
    {
        code: "SELECT\n" +
            "    name, email, COUNT(*)\n" +
            "FROM\n" +
            "    users\n" +
            "GROUP BY\n" +
            "    name, email\n" +
            "HAVING \n" +
            "    COUNT(*) > 1",
        similar: "89.361%"
    }, {
        code: "declare @YourTable table (id int, name varchar(10), email varchar(50))\n" +
            "\n" +
            "INSERT @YourTable VALUES (1,'John','John-email')\n" +
            "INSERT @YourTable VALUES (2,'John','John-email')\n" +
            "INSERT @YourTable VALUES (3,'fred','John-email')\n" +
            "INSERT @YourTable VALUES (4,'fred','fred-email')\n" +
            "INSERT @YourTable VALUES (5,'sam','sam-email')\n" +
            "INSERT @YourTable VALUES (6,'sam','sam-email')\n" +
            "\n" +
            "SELECT\n" +
            "    name,email, COUNT(*) AS CountOf\n" +
            "    FROM @YourTable\n" +
            "    GROUP BY name,email\n" +
            "    HAVING COUNT(*)>1",
        similar: "87.163%"
    }, {
        code: "SELECT name, email\n" +
            "FROM users\n" +
            "GROUP BY name, email\n" +
            "HAVING ( COUNT(*) > 1 )",
        similar: "84.629%"
    }, {
        code: "SELECT id, name, email \n" +
            "FROM users u, users u2\n" +
            "WHERE u.name = u2.name AND u.email = u2.email AND u.id > u2.id",
        similar: "81.366%"
    }, {
        code: "SELECT  *\n" +
            "FROM    (\n" +
            " SELECT a.*\n" +
            " ,      Row_Number() OVER (PARTITION BY Name, Age ORDER BY Name) AS r\n" +
            " FROM   Customers AS a\n" +
            ")       AS b\n" +
            "WHERE   r > 1;" +
            "CREATE TABLE test (\n" +
            "        id      bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY\n" +
            ",       c1      integer\n" +
            ",       c2      text\n" +
            ",       d       date DEFAULT now()\n" +
            ",       v       text\n" +
            ");\n" +
            "\n" +
            "INSERT INTO test (c1, c2, v) VALUES\n" +
            "(1, 'a', 'Select'),\n" +
            "(1, 'a', 'ALL'),\n" +
            "(1, 'a', 'multiple'),\n" +
            "(1, 'a', 'records'),\n" +
            "(2, 'b', 'in columns'),\n" +
            "(2, 'b', 'c1 and c2'),\n" +
            "(3, 'c', '.');\n" +
            "SELECT * FROM test ORDER BY 1;\n" +
            "\n" +
            "SELECT  *\n" +
            "FROM    test\n" +
            "WHERE   (c1, c2) IN (\n" +
            " SELECT c1, c2\n" +
            " FROM   test\n" +
            " GROUP  BY 1,2\n" +
            " HAVING count(*) > 1\n" +
            ")\n" +
            "ORDER   BY 1;",
        similar: "76.321%"
    },
]

export const MOCK_DATA_python_sys: CodeData[] = [
    {
        code: "import os\n" +
            "\n" +
            "PATH = './file.txt'\n" +
            "if os.path.isfile(PATH) and os.access(PATH, os.R_OK):\n" +
            "    print(\"File exists and is readable\")\n" +
            "else:\n" +
            "    print(\"Either the file is missing or not readable\")",
        similar: "89.684%"
    }, {
        code: "import os\n" +
            "os.path.exists(path) # Returns whether the path (directory or file) exists or not\n" +
            "os.path.isfile(path) # Returns whether the file exists or not",
        similar: "86.184%"
    }, {
        code: "def exists(path):\n" +
            "    \"\"\"Test whether a path exists.  Returns False for broken symbolic links\"\"\"\n" +
            "    try:\n" +
            "        st = os.stat(path)\n" +
            "    except os.error:\n" +
            "        return False\n" +
            "    return True",
        similar: "83.674%"
    }, {
        code: "import os\n" +
            "fname = \"foo.txt\"\n" +
            "if os.path.isfile(fname):\n" +
            "    print(\"file does exist at this time\")\n" +
            "else:\n" +
            "    print(\"no such file exists at this time\")",
        similar: "81.136%"
    }, {
        code: "import os\n" +
            "#Your path here e.g. \"C:\\Program Files\\text.txt\"\n" +
            "#For access purposes: \"C:\\\\Program Files\\\\text.txt\"\n" +
            "if os.path.exists(\"C:\\...\"):\n" +
            "    print \"File found!\"\n" +
            "else:\n" +
            "    print \"File not found!\"",
        similar: "76.366%"
    },
]
