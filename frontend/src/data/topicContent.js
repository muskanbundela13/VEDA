const topicContent = {
  "binary-search": {
    understand: {
      title: "What is Binary Search?",
      paragraphs: [
        "Binary Search is a technique used to find an element quickly in a sorted list.",
        "Instead of checking every element one by one, it repeatedly cuts the search area in half.",
      ],
    },

    realWorld: {
      title: "Think about a dictionary.",
      paragraphs: [
        'Imagine you want to find the word "Mango" in a dictionary.',
        "You don't start from the first page and check every word. You open somewhere in the middle.",
      ],

      steps: [
        "Open the dictionary in the middle.",
        'Check whether "Mango" comes before or after that word.',
        "Ignore the half where the word cannot exist.",
        'Repeat until you find "Mango".',
      ],
    },

    howItWorks: {
      title: "Search by cutting the problem in half.",

      description:
        "Binary Search works by repeatedly checking the middle element and eliminating half of the remaining data.",

      array: [10, 20, 30, 40, 50, 60, 70],

      middle: 40,

      target: 60,

      visualLabel: "Middle element",

      targetLabel: "Target",

      explanation:
        "Since 60 is greater than 40, we can ignore everything to the left of 40.",
    },

    code: {
      title: "See the idea in Python.",

      intro:
        "The same idea can be implemented with a few simple steps.",

      language: "Python",

      filename: "binary_search.py",

      code: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid

        elif arr[mid] < target:
            left = mid + 1

        else:
            right = mid - 1

    return -1`,

      points: [
        {
          number: "01",
          text: "left and right define the part of the array we are currently searching.",
        },
        {
          number: "02",
          text: "mid finds the middle position.",
        },
        {
          number: "03",
          text: "We compare the middle value with the target and eliminate half of the search area.",
        },
      ],
    },

    complexity: {
      title: "How efficient is Binary Search?",

      intro:
        "Binary Search is fast because every step removes half of the remaining elements.",

      time: {
        label: "TIME COMPLEXITY",
        value: "O(log n)",
        description:
          "The search space is divided in half after every step.",
      },

      space: {
        label: "SPACE COMPLEXITY",
        value: "O(1)",
        description:
          "The iterative approach only needs a few extra variables.",
      },

      why: {
        text: [
          "If you have 1,000 elements, you don't need to check all 1,000.",
          "Binary Search can find the answer in roughly 10 steps.",
        ],
      },
    },
  },
   "arrays": {
    understand: {
        title: "What is an Array?",
        paragraphs: [
        "An array is a data structure used to store multiple values in a single collection.",
        "The values are stored in an ordered sequence and can be accessed using their index.",
        ],
    },

    realWorld: {
        title: "Think about a row of lockers.",
        paragraphs: [
        "Imagine a row of lockers where every locker has a number.",
        "If you know the locker number, you can directly go to that position.",
        ],

        steps: [
        "Each locker represents one position.",
        "Each position has an index.",
        "You can use the index to access a value.",
        "The values stay arranged in order.",
        ],
    },

    howItWorks: {
        title: "Store values in an ordered sequence.",

        description:
        "An array stores elements next to each other and gives each element an index.",

        array: [10, 20, 30, 40, 50],

        middle: 30,

        target: 40,

        visualLabel: "Array element at index 3",
        
        targetLabel: "Value",

        explanation:
        "Each value has a position, and we can access it using its index.",
    },

    code: {
        title: "See an array in Python.",

        intro:
        "Python lists can be used to represent arrays in many common situations.",

        language: "Python",

        filename: "arrays.py",

        code: `numbers = [10, 20, 30, 40, 50]

    print(numbers[0])
    print(numbers[3])`,

        points: [
        {
            number: "01",
            text: "The list stores multiple values in one collection.",
        },
        {
            number: "02",
            text: "Index 0 refers to the first element.",
        },
        {
            number: "03",
            text: "We can access an element directly using its index.",
        },
        ],
    },

    complexity: {
        title: "How efficient is accessing an array element?",

        intro:
        "Arrays are useful because accessing an element by its index is very fast.",

        time: {
        label: "ACCESS TIME",
        value: "O(1)",
        description:
            "An element can be accessed directly using its index.",
        },

        space: {
        label: "SPACE",
        value: "O(n)",
        description:
            "The array needs space to store its elements.",
        },

        why: {
        text: [
            "If you know the index, you can directly access the value.",
            "You don't need to check every element before it.",
        ],
        },
    },
  },
}

export default topicContent