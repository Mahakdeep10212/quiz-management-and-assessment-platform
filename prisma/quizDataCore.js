module.exports = [
  {
    category: "Python",
    quizzes: [
      {
        title: "Python Fundamentals",
        description: "Test your basic Python syntax, data types, and logic structures.",
        difficulty: "EASY",
        duration: 15,
        passingScore: 60,
        questions: [
          { q: "Which keyword is used to define a function in Python?", o: ["function", "def", "func", "define"], a: 1, exp: "The 'def' keyword is used to create, (or define) a function." },
          { q: "What is the correct file extension for Python files?", o: [".pt", ".pyt", ".py", ".pyth"], a: 2, exp: "Python scripts use the .py file extension." },
          { q: "How do you insert comments in Python code?", o: ["// This is a comment", "/* This is a comment */", "# This is a comment", "<!-- This is a comment -->"], a: 2, exp: "Comments in Python start with the hash character, #." },
          { q: "Which of these collections defines a LIST in Python?", o: ["{\"name\": \"apple\", \"color\": \"green\"}", "(\"apple\", \"banana\", \"cherry\")", "[\"apple\", \"banana\", \"cherry\"]", "{\"apple\", \"banana\", \"cherry\"}"], a: 2, exp: "Lists are created using square brackets []." },
          { q: "What is the output of print(2 ** 3)?", o: ["5", "6", "8", "9"], a: 2, exp: "The ** operator performs exponentiation. 2 to the power of 3 is 8." },
          { q: "How do you start a while loop in Python?", o: ["while x > y {", "while (x > y)", "x > y while {", "while x > y:"], a: 3, exp: "Python uses a colon (:) to start a block of code in a while loop." },
          { q: "Which method can be used to return a string in upper case letters?", o: ["upper()", "toUpperCase()", "uppercase()", "toUpper()"], a: 0, exp: "The upper() method returns a string where all characters are in upper case." },
          { q: "What is a correct syntax to output 'Hello World' in Python?", o: ["echo 'Hello World'", "print('Hello World')", "p('Hello World')", "console.log('Hello World')"], a: 1, exp: "The print() function prints the specified message to the screen." },
          { q: "Which built-in function returns the length of a string or a list?", o: ["size()", "count()", "length()", "len()"], a: 3, exp: "The len() function returns the number of items in an object." },
          { q: "What data type is the result of: x = True?", o: ["String", "Integer", "Boolean", "Float"], a: 2, exp: "True and False are Boolean data types in Python." }
        ]
      },
      {
        title: "Intermediate Python",
        description: "Challenge your understanding of comprehensions, file handling, and OOP.",
        difficulty: "MEDIUM",
        duration: 20,
        passingScore: 70,
        questions: [
          { q: "What is a list comprehension?", o: ["A way to understand list data", "A concise way to create lists", "A function to sort lists", "A built-in Python module"], a: 1, exp: "List comprehension offers a shorter syntax when you want to create a new list based on the values of an existing list." },
          { q: "Which of the following creates a tuple?", o: ["x = (1, 2, 3)", "x = [1, 2, 3]", "x = {1, 2, 3}", "x = <1, 2, 3>"], a: 0, exp: "Tuples are created using parentheses ()." },
          { q: "In Object-Oriented Python, what is the 'self' parameter?", o: ["A reserved keyword that cannot be changed", "A reference to the current instance of the class", "A reference to the parent class", "A built-in variable pointing to the global scope"], a: 1, exp: "The 'self' parameter is a reference to the current instance of the class, and is used to access variables that belongs to the class." },
          { q: "Which statement is used to catch exceptions in Python?", o: ["catch", "except", "handle", "rescue"], a: 1, exp: "The try block lets you test a block of code for errors, and the except block lets you handle the error." },
          { q: "What does the 'pass' statement do?", o: ["Exits a loop", "Skips the current iteration", "Returns a value from a function", "Acts as a placeholder representing no operation"], a: 3, exp: "The pass statement is used as a placeholder for future code. When the pass statement is executed, nothing happens." },
          { q: "How do you open a file named 'data.txt' for reading?", o: ["file = open('data.txt', 'w')", "file = open('data.txt', 'r')", "file = read('data.txt')", "file = open('data.txt', 'read')"], a: 1, exp: "'r' opens a file for reading, which is the default mode." },
          { q: "What is the difference between a list and a tuple?", o: ["Tuples are mutable, lists are immutable", "Lists are mutable, tuples are immutable", "They are exactly the same", "Lists can only hold integers"], a: 1, exp: "Lists can be changed after creation (mutable), whereas tuples cannot (immutable)." },
          { q: "What does the __init__() function do in a class?", o: ["Initializes a new module", "It is executed when the class is being initiated (constructor)", "It destroys an object", "It imports dependencies"], a: 1, exp: "All classes have a function called __init__(), which is always executed when the class is being initiated." },
          { q: "Which operator is used for floor division in Python?", o: ["/", "//", "%", "\\"], a: 1, exp: "The // operator divides and rounds down to the nearest integer." },
          { q: "What is the output of bool(\"\")?", o: ["True", "False", "Error", "None"], a: 1, exp: "An empty string evaluates to False in a boolean context." }
        ]
      },
      {
        title: "Advanced Python Programming",
        description: "Test your skills on decorators, generators, and advanced paradigms.",
        difficulty: "HARD",
        duration: 25,
        passingScore: 75,
        questions: [
          { q: "What is a decorator in Python?", o: ["A class that styles UI components", "A function that takes another function and extends its behavior without explicitly modifying it", "A module for string formatting", "A keyword used to wrap classes"], a: 1, exp: "A decorator allows you to modify the behavior of a function or class. Decorators are usually called before the definition of a function you want to decorate using the @ symbol." },
          { q: "What does the 'yield' keyword do?", o: ["Stops the execution of a function completely", "Returns a value and suspends the function's execution, turning it into a generator", "Yields processor time to other threads", "Throws an exception"], a: 1, exp: "yield suspends function's execution and sends a value back to the caller, but retains enough state to enable function to resume where it is left off." },
          { q: "What is a lambda function in Python?", o: ["A function that runs asynchronously", "A small anonymous function defined with the lambda keyword", "A function imported from the AWS SDK", "A function that takes no arguments"], a: 1, exp: "A lambda function is a small anonymous function that can take any number of arguments, but can only have one expression." },
          { q: "Which of the following statements about the Global Interpreter Lock (GIL) is true?", o: ["It allows multiple threads to execute Python bytecodes in parallel", "It prevents multiple threads from executing Python bytecodes at once", "It is a security feature to lock variables", "It manages database transactions"], a: 1, exp: "In CPython, the GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes at once." },
          { q: "What is the time complexity of looking up a key in a Python dictionary?", o: ["O(N)", "O(log N)", "O(N^2)", "O(1) on average"], a: 3, exp: "Python dictionaries are implemented as hash tables, so lookup is O(1) on average." },
          { q: "What is the purpose of the *args and **kwargs parameters?", o: ["They are pointers to memory addresses", "They allow a function to accept an arbitrary number of positional and keyword arguments", "They force arguments to be strictly typed", "They are used for unpacking tuples only"], a: 1, exp: "*args is used to pass a variable number of non-keyword arguments, and **kwargs is used for keyword arguments." },
          { q: "Which magic method is invoked when the + operator is used on two objects?", o: ["__add__", "__plus__", "__sum__", "__concat__"], a: 0, exp: "The __add__ dunder (magic) method defines the behavior for the + operator." },
          { q: "What is monkey patching in Python?", o: ["Fixing a bug in production directly", "Dynamic modifications of a class or module at runtime", "A way to hide code from the compiler", "Testing framework terminology"], a: 1, exp: "Monkey patching refers to dynamic modifications of a class or module at runtime, often used to replace methods or add features." },
          { q: "How can you copy a list by value, creating a distinct new list?", o: ["list2 = list1", "list2 = list1.copy()", "list2 = list1[:]", "Both B and C"], a: 3, exp: "Both the copy() method and slicing [:] create a shallow copy of the list." },
          { q: "What is duck typing?", o: ["A type of error in Python", "A programming style where an object's suitability is determined by the presence of certain methods and properties, rather than its type", "A strict type checking mechanism", "Importing typing modules"], a: 1, exp: "Duck typing relies on the principle: 'If it walks like a duck and quacks like a duck, it must be a duck.' It focuses on behavior over object type." }
        ]
      }
    ]
  },
  {
    category: "Java",
    quizzes: [
      {
        title: "Java Fundamentals",
        description: "Assess your knowledge of Java basics, data types, and syntax.",
        difficulty: "EASY",
        duration: 15,
        passingScore: 60,
        questions: [
          { q: "Which of the following is not a Java feature?", o: ["Object-oriented", "Use of pointers", "Portable", "Dynamic and Extensible"], a: 1, exp: "Java does not support explicit pointers to avoid security issues and simplify memory management." },
          { q: "What is the size of an int variable in Java?", o: ["8 bit", "16 bit", "32 bit", "64 bit"], a: 2, exp: "In Java, an int is a 32-bit signed two's complement integer." },
          { q: "What is the correct syntax to create an object of a class named MyClass?", o: ["MyClass obj = new MyClass();", "class obj = new MyClass();", "MyClass obj();", "new MyClass obj = MyClass();"], a: 0, exp: "The 'new' keyword is used to instantiate an object of a class." },
          { q: "Which method is the entry point for any Java program?", o: ["start()", "main()", "run()", "init()"], a: 1, exp: "The public static void main(String[] args) method is the entry point of a Java application." },
          { q: "Which keyword is used to inherit a class in Java?", o: ["implements", "extends", "inherits", "super"], a: 1, exp: "The 'extends' keyword is used to inherit properties and methods from a parent class." },
          { q: "Which data type is used to create a variable that should store text?", o: ["String", "Txt", "string", "Text"], a: 0, exp: "The String class is used to store text in Java. Note the capital 'S'." },
          { q: "How do you create a single-line comment in Java?", o: ["# This is a comment", "/* This is a comment */", "// This is a comment", "<!-- This is a comment -->"], a: 2, exp: "// is used for single-line comments in Java." },
          { q: "What is the default value of a boolean variable in Java?", o: ["true", "false", "0", "null"], a: 1, exp: "The default value for a boolean variable is false." },
          { q: "Which access modifier restricts access the most?", o: ["public", "protected", "default", "private"], a: 3, exp: "The private modifier restricts access strictly to within the same class." },
          { q: "What does JVM stand for?", o: ["Java Variable Machine", "Java Virtual Machine", "Java Verified Mechanism", "Java Visual Monitor"], a: 1, exp: "JVM stands for Java Virtual Machine, which enables a computer to run Java programs." }
        ]
      },
      {
        title: "Object-Oriented Java",
        description: "Test your understanding of encapsulation, inheritance, polymorphism, and abstraction.",
        difficulty: "MEDIUM",
        duration: 20,
        passingScore: 70,
        questions: [
          { q: "What is encapsulation in Java?", o: ["Inheriting from multiple classes", "Wrapping data and code acting on the data together as a single unit", "Hiding the implementation details and showing only functionality", "Creating multiple methods with the same name"], a: 1, exp: "Encapsulation is the mechanism of wrapping the data (variables) and code acting on the data (methods) together as a single unit (like a class)." },
          { q: "What is method overloading?", o: ["Having multiple methods with the same name but different parameters within a class", "Providing a specific implementation of a method that is already provided by its superclass", "Overwriting a file", "Creating a method that takes no parameters"], a: 0, exp: "Method overloading occurs when a class has multiple methods with the same name but different parameter lists." },
          { q: "Which keyword is used to implement an interface?", o: ["extends", "implements", "uses", "inherits"], a: 1, exp: "The 'implements' keyword is used by a class to implement an interface." },
          { q: "Can a class implement multiple interfaces in Java?", o: ["No, Java does not support multiple inheritance", "Yes, a class can implement multiple interfaces", "Only if the interfaces are in the same package", "Yes, but only abstract classes can"], a: 1, exp: "While Java doesn't support multiple inheritance of classes, a single class can implement multiple interfaces." },
          { q: "What does the 'super' keyword do?", o: ["Calls the child class constructor", "Refers to the superclass (parent class) objects", "Makes a variable static", "Creates a super class dynamically"], a: 1, exp: "The super keyword is a reference variable used to refer to immediate parent class object, methods, or constructors." },
          { q: "What is an abstract class?", o: ["A class that cannot be instantiated", "A class with only abstract methods", "A class that cannot be inherited", "A class with no variables"], a: 0, exp: "An abstract class is a restricted class that cannot be used to create objects (to access it, it must be inherited from another class)." },
          { q: "Which keyword prevents a method from being overridden?", o: ["static", "const", "final", "abstract"], a: 2, exp: "The final keyword, when applied to a method, prevents subclass from overriding it." },
          { q: "What happens if a constructor is declared private?", o: ["The class cannot be inherited", "The class cannot be instantiated from outside the class", "The constructor cannot take arguments", "Compilation error"], a: 1, exp: "A private constructor ensures that an object of the class cannot be created outside the class, often used in the Singleton pattern." },
          { q: "What is polymorphism?", o: ["Hiding internal state", "The ability of a variable, function or object to take on multiple forms", "Wrapping code and data", "Restricting access to members"], a: 1, exp: "Polymorphism (many forms) allows objects to be treated as instances of their parent class rather than their actual class, enabling dynamic method resolution." },
          { q: "Which class is the superclass of every class in Java?", o: ["String", "Object", "Main", "System"], a: 1, exp: "The Object class is the parent class of all the classes in Java by default." }
        ]
      },
      {
        title: "Advanced Java",
        description: "Test your knowledge on multithreading, collections, generics, and streams.",
        difficulty: "HARD",
        duration: 25,
        passingScore: 75,
        questions: [
          { q: "Which interface must be implemented to create a thread using a Runnable object?", o: ["Thread", "Executable", "Runnable", "Callable"], a: 2, exp: "The Runnable interface should be implemented by any class whose instances are intended to be executed by a thread." },
          { q: "What is the difference between ArrayList and LinkedList?", o: ["ArrayList is thread-safe, LinkedList is not", "ArrayList uses a dynamic array, LinkedList uses a doubly linked list", "LinkedList allows nulls, ArrayList does not", "ArrayList is faster for insertions in the middle"], a: 1, exp: "ArrayList internally uses a dynamic array to store the elements. LinkedList internally uses a doubly linked list." },
          { q: "What is a 'checked exception' in Java?", o: ["An exception checked at runtime", "An exception that must be either caught or declared in the method signature", "An exception that is always fatal", "An exception thrown by the JVM automatically"], a: 1, exp: "Checked exceptions are checked at compile-time. You must handle them using try-catch or declare them using the throws keyword." },
          { q: "Which collection class allows you to associate its elements with key values and does not allow duplicate keys?", o: ["HashSet", "ArrayList", "HashMap", "TreeSet"], a: 2, exp: "HashMap implements the Map interface, which maps keys to values and prohibits duplicate keys." },
          { q: "What is the purpose of Generics in Java?", o: ["To provide stronger type checks at compile time", "To make code execute faster", "To allow multiple inheritance", "To generate code dynamically"], a: 0, exp: "Generics add stability to your code by making more of your bugs detectable at compile time (type safety)." },
          { q: "What does the 'synchronized' keyword do?", o: ["Synchronizes data with a database", "Prevents thread interference and memory consistency errors", "Makes an application run synchronously without threads", "Optimizes garbage collection"], a: 1, exp: "The synchronized keyword is used to indicate that a method or block can be accessed by only one thread at a time." },
          { q: "What is the Java Streams API primarily used for?", o: ["Reading and writing files", "Functional-style operations on streams of elements (like collections)", "Creating video streams", "Network socket communication"], a: 1, exp: "Introduced in Java 8, the Streams API is used to process collections of objects in a functional and declarative manner." },
          { q: "What is garbage collection in Java?", o: ["A manual process of deleting unused objects", "An automatic process of reclaiming the runtime unused memory automatically", "A tool to delete old source files", "A method to clean the console"], a: 1, exp: "Garbage collection is the process by which Java programs perform automatic memory management." },
          { q: "What is the difference between '==' and the 'equals()' method for Strings?", o: ["They are identical", "'==' compares references, 'equals()' compares the actual content", "'==' compares content, 'equals()' compares references", "'==' is for characters, 'equals()' is for strings"], a: 1, exp: "The == operator checks if both references point to the same object in memory, while .equals() evaluates to the comparison of values in the objects." },
          { q: "Which design pattern is implemented using a private constructor and a static instance variable?", o: ["Factory", "Observer", "Singleton", "Decorator"], a: 2, exp: "The Singleton pattern ensures a class has only one instance and provides a global point of access to it." }
        ]
      }
    ]
  },
  {
    category: "Database",
    quizzes: [
      {
        title: "Database Fundamentals",
        description: "Review basic concepts of relational databases, tables, and keys.",
        difficulty: "EASY",
        duration: 15,
        passingScore: 60,
        questions: [
          { q: "What does DBMS stand for?", o: ["Data Building Management System", "Database Management System", "Database Manipulation Software", "Data Backup Management System"], a: 1, exp: "DBMS stands for Database Management System, software used to store, retrieve, and run queries on data." },
          { q: "Which SQL command is used to retrieve data from a database?", o: ["GET", "SELECT", "FETCH", "READ"], a: 1, exp: "The SELECT statement is used to select data from a database." },
          { q: "What is a Primary Key?", o: ["A key used to unlock the database", "A column or set of columns that uniquely identifies each row in a table", "The first column in a table", "A column that can have null values"], a: 1, exp: "A primary key is a specific choice of a minimal set of attributes that uniquely specify a tuple (row) in a relation (table)." },
          { q: "Which command is used to add new rows to a table?", o: ["ADD ROW", "INSERT INTO", "UPDATE", "APPEND"], a: 1, exp: "The INSERT INTO statement is used to insert new records in a table." },
          { q: "What does SQL stand for?", o: ["Structured Question Language", "Strong Query Language", "Structured Query Language", "Sequential Query Language"], a: 2, exp: "SQL stands for Structured Query Language." },
          { q: "Which keyword is used to filter records in a SELECT query?", o: ["FILTER", "MATCH", "WHERE", "HAVING"], a: 2, exp: "The WHERE clause is used to filter records that fulfill a specified condition." },
          { q: "What is the purpose of the UPDATE statement?", o: ["To add a new column", "To modify the existing records in a table", "To update the database software", "To refresh the connection"], a: 1, exp: "The UPDATE statement is used to modify the existing records in a table." },
          { q: "Which of the following removes all rows from a table without deleting the table structure?", o: ["DROP TABLE", "DELETE TABLE", "TRUNCATE TABLE", "REMOVE TABLE"], a: 2, exp: "The TRUNCATE TABLE command deletes the data inside a table, but not the table itself." },
          { q: "What is a Foreign Key?", o: ["A key from a foreign country", "A primary key in another table used to establish a link between the data in two tables", "A temporary key", "An encrypted key"], a: 1, exp: "A Foreign Key is a field (or collection of fields) in one table, that refers to the Primary Key in another table." },
          { q: "Which SQL statement is used to sort the result-set?", o: ["SORT BY", "ORDER BY", "ALIGN BY", "GROUP BY"], a: 1, exp: "The ORDER BY keyword is used to sort the result-set in ascending or descending order." }
        ]
      },
      {
        title: "SQL & Queries",
        description: "Test your skills on joins, grouping, and complex queries.",
        difficulty: "MEDIUM",
        duration: 20,
        passingScore: 70,
        questions: [
          { q: "What is the difference between INNER JOIN and LEFT JOIN?", o: ["INNER JOIN returns only matching rows; LEFT JOIN returns all rows from the left table and matched rows from the right table", "They are exactly the same", "LEFT JOIN returns only matching rows", "INNER JOIN returns all rows from both tables"], a: 0, exp: "INNER JOIN selects records that have matching values in both tables. LEFT JOIN returns all records from the left table, and the matched records from the right table." },
          { q: "Which clause is used with aggregate functions like COUNT or SUM to group the result-set?", o: ["ORDER BY", "GROUP BY", "AGGREGATE BY", "COLLECT BY"], a: 1, exp: "The GROUP BY statement groups rows that have the same values into summary rows, often used with aggregate functions." },
          { q: "How do you filter groups created by GROUP BY?", o: ["WHERE", "FILTER", "HAVING", "LIMIT"], a: 2, exp: "The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions." },
          { q: "What does the COUNT() function do?", o: ["Adds up all values in a column", "Returns the number of rows that matches a specified criterion", "Counts the number of characters in a string", "Averages the values"], a: 1, exp: "The COUNT() function returns the number of rows that matches a specified criterion." },
          { q: "Which operator is used to search for a specified pattern in a column?", o: ["MATCH", "LIKE", "SEARCH", "SIMILAR"], a: 1, exp: "The LIKE operator is used in a WHERE clause to search for a specified pattern in a column." },
          { q: "What is the result of the UNION operator?", o: ["Multiplies two tables", "Combines the result-set of two or more SELECT statements (removing duplicates)", "Finds the difference between two tables", "Returns only the matching rows of two tables"], a: 1, exp: "The UNION operator is used to combine the result-set of two or more SELECT statements. Every SELECT statement within UNION must have the same number of columns." },
          { q: "Which SQL constraint ensures that all values in a column are different?", o: ["NOT NULL", "DISTINCT", "UNIQUE", "CHECK"], a: 2, exp: "The UNIQUE constraint ensures that all values in a column are different." },
          { q: "What is a subquery?", o: ["A query that runs very fast", "A query nested inside another query", "A query that only selects a subset of columns", "A query that fails"], a: 1, exp: "A Subquery or Inner query or Nested query is a query within another SQL query and embedded within the WHERE clause." },
          { q: "Which function is used to return the total sum of a numeric column?", o: ["ADD()", "TOTAL()", "SUM()", "PLUS()"], a: 2, exp: "The SUM() function returns the total sum of a numeric column." },
          { q: "What is the meaning of the '%' wildcard in a LIKE clause?", o: ["Represents a single character", "Represents zero, one, or multiple characters", "Represents a number", "Represents a space"], a: 1, exp: "The percent sign (%) represents zero, one, or multiple characters in a LIKE pattern." }
        ]
      },
      {
        title: "Advanced Database Concepts",
        description: "Assess your knowledge of indexing, normalization, transactions, and NoSQL.",
        difficulty: "HARD",
        duration: 25,
        passingScore: 75,
        questions: [
          { q: "What is database normalization?", o: ["Making the database run faster", "Organizing data to reduce redundancy and improve data integrity", "Encrypting the database", "Converting SQL to NoSQL"], a: 1, exp: "Normalization is the process of organizing data in a database to avoid data redundancy, insertion anomaly, update anomaly & deletion anomaly." },
          { q: "What does ACID stand for in the context of database transactions?", o: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Completeness, Integrity, Durability", "Automated, Consistent, Isolated, Distributed", "Allocation, Concurrency, Isolation, Deletion"], a: 0, exp: "ACID guarantees that database transactions are processed reliably." },
          { q: "What is an index in a database?", o: ["A table of contents at the beginning of a database file", "A data structure that improves the speed of data retrieval operations", "A list of all users", "A backup of the database"], a: 1, exp: "Indexes are used to quickly locate data without having to search every row in a database table every time a database table is accessed." },
          { q: "Which normal form states that every non-prime attribute is fully functionally dependent on the primary key?", o: ["1NF", "2NF", "3NF", "BCNF"], a: 1, exp: "Second Normal Form (2NF) requires that the table is in 1NF and all non-key attributes are fully dependent on the primary key." },
          { q: "What is a deadlock in a database?", o: ["When the server crashes", "When two or more transactions indefinitely wait for one another to release locks", "When a query takes too long to execute", "When the disk is full"], a: 1, exp: "A deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process." },
          { q: "Which statement is used to undo a transaction?", o: ["UNDO", "REVERT", "ROLLBACK", "COMMIT"], a: 2, exp: "The ROLLBACK command is a transactional command used to undo transactions that have not already been saved to the database." },
          { q: "What is a stored procedure?", o: ["A prepared SQL code that you can save, so the code can be reused over and over again", "A physical file storing data", "A backup process", "A trigger that runs on every insert"], a: 0, exp: "A stored procedure is a prepared SQL code that you can save, so the code can be reused over and over again." },
          { q: "What is the primary characteristic of a NoSQL database compared to a relational database?", o: ["It doesn't use disks", "It relies heavily on complex JOINs", "It typically uses a flexible, non-tabular data model (e.g., document, key-value)", "It only stores text"], a: 2, exp: "NoSQL databases provide a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in relational databases." },
          { q: "What is a database view?", o: ["A graphical user interface for the DB", "A virtual table based on the result-set of an SQL statement", "A snapshot of the data stored on disk", "An index"], a: 1, exp: "A view is a virtual table based on the result-set of an SQL statement. It contains rows and columns, just like a real table." },
          { q: "Which isolation level prevents 'dirty reads' but allows 'non-repeatable reads'?", o: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"], a: 1, exp: "Read Committed guarantees that any data read is committed at the moment it is read. Thus it prevents dirty reads, but it does not prevent non-repeatable reads." }
        ]
      }
    ]
  },
  {
    category: "Computer Networks",
    quizzes: [
      {
        title: "Computer Networks Fundamentals",
        description: "Test your knowledge on the basics of networking and the OSI model.",
        difficulty: "EASY",
        duration: 15,
        passingScore: 60,
        questions: [
          { q: "What does LAN stand for?", o: ["Large Area Network", "Local Area Network", "Logical Area Network", "Location Area Network"], a: 1, exp: "LAN stands for Local Area Network, a computer network that interconnects computers within a limited area." },
          { q: "Which protocol is used to browse the web?", o: ["FTP", "SMTP", "HTTP", "SNMP"], a: 2, exp: "HTTP (Hypertext Transfer Protocol) is the foundation of data communication for the World Wide Web." },
          { q: "What does IP stand for?", o: ["Internet Protocol", "Internal Protocol", "Intranet Provider", "Information Protocol"], a: 0, exp: "IP stands for Internet Protocol, the principal communications protocol in the Internet protocol suite for relaying datagrams across network boundaries." },
          { q: "How many layers are in the OSI model?", o: ["4", "5", "7", "9"], a: 2, exp: "The Open Systems Interconnection (OSI) model characterizes computing functions into 7 universal layers." },
          { q: "Which device is primarily used to connect different networks together?", o: ["Hub", "Switch", "Router", "Modem"], a: 2, exp: "A router connects two or more data lines from different IP networks." },
          { q: "What is a MAC address?", o: ["A temporary IP address", "A physical address unique to a network interface controller (NIC)", "An apple computer's address", "A web server's address"], a: 1, exp: "A Media Access Control (MAC) address is a unique identifier assigned to a network interface controller (NIC) for use as a network address in communications within a network segment." },
          { q: "Which protocol is used to send emails?", o: ["POP3", "IMAP", "SMTP", "FTP"], a: 2, exp: "Simple Mail Transfer Protocol (SMTP) is an internet standard communication protocol for electronic mail transmission." },
          { q: "What does DNS do?", o: ["Downloads files", "Assigns IP addresses dynamically", "Translates domain names to IP addresses", "Secures the network"], a: 2, exp: "The Domain Name System (DNS) translates human-readable domain names (like www.example.com) to machine-readable IP addresses." },
          { q: "What is the standard port for HTTPS?", o: ["80", "21", "25", "443"], a: 3, exp: "HTTPS uses port 443 by default for secure web traffic." },
          { q: "Which layer of the OSI model deals with MAC addresses?", o: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"], a: 1, exp: "The Data Link layer is responsible for node-to-node data transfer and MAC addressing." }
        ]
      },
      {
        title: "TCP/IP & Networking",
        description: "Dive deeper into transport protocols, IP addressing, and subnetting.",
        difficulty: "MEDIUM",
        duration: 20,
        passingScore: 70,
        questions: [
          { q: "Which protocol is responsible for reliable, connection-oriented communication?", o: ["UDP", "IP", "TCP", "ICMP"], a: 2, exp: "Transmission Control Protocol (TCP) is connection-oriented, meaning a connection is established and maintained until the application programs at each end have finished exchanging messages." },
          { q: "What is the key difference between TCP and UDP?", o: ["UDP is reliable, TCP is not", "TCP is connectionless, UDP is connection-oriented", "TCP guarantees delivery, UDP does not", "UDP is used for email, TCP for video streaming"], a: 2, exp: "TCP guarantees delivery of data in the correct order, whereas UDP (User Datagram Protocol) is connectionless and does not guarantee delivery, making it faster but less reliable." },
          { q: "How many bits make up an IPv4 address?", o: ["16", "32", "64", "128"], a: 1, exp: "An IPv4 address is a 32-bit number that uniquely identifies a network interface on a machine." },
          { q: "Which protocol dynamically assigns IP addresses to devices on a network?", o: ["DNS", "DHCP", "ARP", "NAT"], a: 1, exp: "Dynamic Host Configuration Protocol (DHCP) is a network management protocol used on UDP/IP networks whereby a DHCP server dynamically assigns an IP address." },
          { q: "What is the purpose of NAT?", o: ["To translate domain names to IPs", "To map multiple private IP addresses to a single public IP address", "To secure a Wi-Fi network", "To route packets based on MAC addresses"], a: 1, exp: "Network Address Translation (NAT) maps multiple local private addresses to a public one before transferring the information." },
          { q: "What does the subnet mask 255.255.255.0 represent in CIDR notation?", o: ["/8", "/16", "/24", "/32"], a: 2, exp: "255.255.255.0 means the first 24 bits are network bits, which is written as /24 in CIDR notation." },
          { q: "Which ICMP message type is primarily used by the 'ping' command?", o: ["Destination Unreachable", "Echo Request/Reply", "Time Exceeded", "Redirect"], a: 1, exp: "The ping utility uses ICMP Echo Request and Echo Reply messages to test connectivity." },
          { q: "What is a default gateway?", o: ["The router that provides access to external networks", "The switch connecting local computers", "The primary DNS server", "The firewall blocking traffic"], a: 0, exp: "A default gateway serves as an access point or IP router that a networked computer uses to send information to a computer in another network or the internet." },
          { q: "Which layer of the TCP/IP model corresponds to the OSI model's Transport layer?", o: ["Application", "Transport", "Internet", "Network Access"], a: 1, exp: "The Transport layer in TCP/IP directly corresponds to the Transport layer in the OSI model." },
          { q: "What does ARP do?", o: ["Routes packets", "Translates IP addresses to MAC addresses", "Translates MAC addresses to IP addresses", "Encrypts network traffic"], a: 1, exp: "Address Resolution Protocol (ARP) is used to find the hardware (MAC) address of a host from a known IP address." }
        ]
      },
      {
        title: "Advanced Computer Networks",
        description: "Test your skills on routing protocols, IPv6, and network architecture.",
        difficulty: "HARD",
        duration: 25,
        passingScore: 75,
        questions: [
          { q: "Which routing protocol uses the Shortest Path First (Dijkstra's) algorithm?", o: ["RIP", "BGP", "OSPF", "EIGRP"], a: 2, exp: "Open Shortest Path First (OSPF) is a link-state routing protocol that uses Dijkstra's algorithm to calculate the shortest path." },
          { q: "How many bits are in an IPv6 address?", o: ["32", "64", "128", "256"], a: 2, exp: "An IPv6 address is 128 bits long, providing a vastly larger address space than IPv4." },
          { q: "What is BGP primarily used for?", o: ["Routing within a single corporate network", "Routing between different autonomous systems on the Internet", "Assigning IP addresses", "Translating domain names"], a: 1, exp: "Border Gateway Protocol (BGP) is the protocol underlying the global routing system of the internet, exchanging routing information between autonomous systems (AS)." },
          { q: "Which mechanism allows a router to drop packets to avoid severe network congestion?", o: ["NAT", "VLAN", "QoS (RED)", "ARP"], a: 2, exp: "Random Early Detection (RED) is a queuing discipline for a network scheduler suited for congestion avoidance as part of Quality of Service (QoS)." },
          { q: "What is a VLAN?", o: ["Virtual Local Area Network, used to logically segment a network on switches", "A VPN replacement", "A routing protocol", "A type of fiber optic cable"], a: 0, exp: "A VLAN is a logical broadcast domain that can span multiple physical LAN segments, configured on network switches." },
          { q: "In the context of wireless networks, what does CSMA/CA stand for?", o: ["Carrier Sense Multiple Access with Collision Avoidance", "Carrier Signal Modulation Access with Collision Alert", "Central System Management Architecture", "Client Server Multiple Access"], a: 0, exp: "CSMA/CA is a network multiple access method in which carrier sensing is used, but nodes attempt to avoid collisions by transmitting only when the channel is sensed to be 'idle'." },
          { q: "What is the purpose of an Anycast address in IPv6?", o: ["Sends a packet to all nodes", "Sends a packet to a specific node", "Sends a packet to the nearest node among a group of nodes", "It does not exist in IPv6"], a: 2, exp: "Anycast routing delivers a message to a single, nearest (in terms of routing distance) node among a group of nodes configured with the same anycast address." },
          { q: "What is the TCP 3-way handshake sequence?", o: ["SYN, ACK, FIN", "SYN, SYN-ACK, ACK", "REQ, RES, ACK", "ACK, SYN, SYN-ACK"], a: 1, exp: "The three-way handshake (SYN, SYN-ACK, ACK) is the method used by TCP set up a logical connection." },
          { q: "Which OSI layer is responsible for data encryption, compression, and translation?", o: ["Application", "Presentation", "Session", "Transport"], a: 1, exp: "The Presentation layer formats the data to be presented to the application layer, handling encryption, compression, and translation." },
          { q: "What is the primary function of a reverse proxy?", o: ["To hide the client's IP from the internet", "To intercept outbound requests", "To sit in front of web servers and forward client requests to those web servers", "To act as a firewall at the network perimeter"], a: 2, exp: "A reverse proxy is a server that sits in front of web servers and forwards client (e.g. web browser) requests to those web servers, often used for load balancing and security." }
        ]
      }
    ]
  },
  {
    category: "Cyber Security",
    quizzes: [
      {
        title: "Cyber Security Fundamentals",
        description: "Assess your knowledge of basic security concepts, threats, and mitigation.",
        difficulty: "EASY",
        duration: 15,
        passingScore: 60,
        questions: [
          { q: "What does the CIA triad stand for in information security?", o: ["Confidentiality, Integrity, Availability", "Control, Information, Access", "Cyber, Intelligence, Agency", "Confidentiality, Identity, Authentication"], a: 0, exp: "The CIA triad is a foundational model in security representing Confidentiality, Integrity, and Availability." },
          { q: "Which attack attempts to trick users into revealing sensitive information through fraudulent emails?", o: ["DDoS", "Phishing", "Port scanning", "Brute force"], a: 1, exp: "Phishing is a social engineering attack where an attacker sends a fraudulent message designed to trick a human victim into revealing sensitive information." },
          { q: "What is malware?", o: ["Hardware that malfunctions", "Malicious software designed to cause harm or gain unauthorized access", "A type of firewall", "A secure protocol"], a: 1, exp: "Malware (short for malicious software) is any software intentionally designed to cause disruption to a computer, server, client, or computer network." },
          { q: "What is the purpose of a firewall?", o: ["To speed up the internet", "To monitor and control incoming and outgoing network traffic based on predetermined security rules", "To scan for viruses on the hard drive", "To encrypt emails"], a: 1, exp: "A firewall establishes a barrier between a trusted internal network and untrusted external networks." },
          { q: "What does MFA stand for?", o: ["Multi-Factor Authentication", "Multiple File Access", "Main Firewall Application", "Master Frequency Array"], a: 0, exp: "Multi-Factor Authentication requires a user to provide two or more verification factors to gain access to a resource." },
          { q: "What is a 'Zero-Day' vulnerability?", o: ["A vulnerability that takes zero days to fix", "A vulnerability that is known to the vendor and patched", "A previously unknown vulnerability that attackers exploit before a patch exists", "A virus that deletes data at midnight"], a: 2, exp: "A zero-day is a flaw in software, hardware or firmware that is unknown to the party or parties responsible for patching or otherwise fixing the flaw." },
          { q: "Which technique involves guessing passwords by systematically trying all possible combinations?", o: ["Dictionary attack", "Phishing", "Brute force attack", "SQL Injection"], a: 2, exp: "A brute-force attack consists of an attacker submitting many passwords or passphrases with the hope of eventually guessing correctly." },
          { q: "What is Ransomware?", o: ["Software that steals passwords", "Malware that encrypts a victim's files and demands payment to decrypt them", "A tool used to test network security", "A fake antivirus program"], a: 1, exp: "Ransomware is a type of malware from cryptovirology that threatens to publish the victim's data or perpetually block access to it unless a ransom is paid." },
          { q: "What is Social Engineering?", o: ["Building secure social networks", "Manipulating people into performing actions or divulging confidential information", "Analyzing social media data", "Programming AI chatbots"], a: 1, exp: "Social engineering in the context of information security is the psychological manipulation of people into performing actions or divulging confidential information." },
          { q: "What does encryption do?", o: ["Deletes sensitive files", "Converts readable data into an unreadable format to prevent unauthorized access", "Increases network speed", "Backs up data"], a: 1, exp: "Encryption is the process of encoding information so that only authorized parties can access it." }
        ]
      },
      {
        title: "Web Security",
        description: "Test your understanding of common web vulnerabilities like XSS and SQLi.",
        difficulty: "MEDIUM",
        duration: 20,
        passingScore: 70,
        questions: [
          { q: "What is SQL Injection (SQLi)?", o: ["Injecting JavaScript into a web page", "An attack that interferes with the queries an application makes to its database", "A method to speed up database queries", "A tool to format SQL code"], a: 1, exp: "SQL injection is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database." },
          { q: "Which vulnerability allows an attacker to inject malicious client-side scripts into web pages viewed by other users?", o: ["CSRF", "XSS (Cross-Site Scripting)", "SQLi", "SSRF"], a: 1, exp: "Cross-Site Scripting (XSS) occurs when an application includes untrusted data in a web page without proper validation or escaping." },
          { q: "What is the best defense against SQL Injection?", o: ["Client-side validation", "Using prepared statements (parameterized queries)", "Encrypting the database", "Using a firewall"], a: 1, exp: "Prepared statements ensure that an attacker is not able to change the intent of a query, even if SQL commands are inserted by an attacker." },
          { q: "What does CSRF stand for?", o: ["Cross-Site Request Forgery", "Cross-Server Routing Function", "Client-Side Request Formatting", "Cyber Security Response Force"], a: 0, exp: "Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they're currently authenticated." },
          { q: "How can CSRF attacks typically be prevented?", o: ["Using CAPTCHAs on every page", "Using Anti-CSRF tokens", "Sanitizing HTML input", "Disabling JavaScript"], a: 1, exp: "The most common defense against CSRF is the use of an anti-CSRF token, a unique, unpredictable value generated by the server and included in subsequent requests." },
          { q: "What is the purpose of the Same-Origin Policy (SOP)?", o: ["To prevent users from visiting malicious sites", "To restrict how a document or script loaded from one origin can interact with a resource from another origin", "To ensure all images load from the same server", "To block SQL injection"], a: 1, exp: "The Same-Origin Policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin." },
          { q: "Which HTTP header is used to protect against clickjacking?", o: ["X-Frame-Options", "Content-Security-Policy", "Strict-Transport-Security", "Set-Cookie"], a: 0, exp: "The X-Frame-Options HTTP response header can be used to indicate whether or not a browser should be allowed to render a page in a <frame>, <iframe>, <embed> or <object>." },
          { q: "What does a Content Security Policy (CSP) primarily help prevent?", o: ["DDoS attacks", "SQL Injection", "XSS and data injection attacks", "Brute force attacks"], a: 2, exp: "Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks." },
          { q: "What does HSTS (HTTP Strict Transport Security) do?", o: ["Forces the browser to always use HTTPS when communicating with the server", "Encrypts the database", "Prevents XSS attacks", "Compresses HTTP responses"], a: 0, exp: "HSTS tells browsers that the site should only be accessed using HTTPS, instead of using HTTP." },
          { q: "What is Directory Traversal?", o: ["Listing all files in a directory", "An exploit allowing attackers to access restricted directories and execute commands outside of the web server's root directory", "A way to optimize file search", "A backup strategy"], a: 1, exp: "Directory traversal (or path traversal) allows an attacker to read arbitrary files on the server that is running an application." }
        ]
      },
      {
        title: "Network Security & Cryptography",
        description: "Assess your knowledge of encryption, PKI, and network defense mechanisms.",
        difficulty: "HARD",
        duration: 25,
        passingScore: 75,
        questions: [
          { q: "What is the difference between symmetric and asymmetric encryption?", o: ["Symmetric uses one key for both encryption and decryption; asymmetric uses a public/private key pair", "Symmetric is slower than asymmetric", "Symmetric is only used for data at rest", "Asymmetric uses the same key"], a: 0, exp: "Symmetric encryption uses a single key. Asymmetric encryption uses a public key to encrypt and a private key to decrypt." },
          { q: "What is a Hash function?", o: ["A function that decrypts data", "A one-way mathematical function that converts data of any size to a fixed-size string", "An algorithm for generating random numbers", "A type of symmetric encryption"], a: 1, exp: "A cryptographic hash function takes an arbitrary amount of data input and produces a fixed-size output of enciphered text called a hash value." },
          { q: "What is the purpose of a digital signature?", o: ["To encrypt an entire email", "To verify the authenticity and integrity of a message or document", "To compress a file", "To hide the sender's identity"], a: 1, exp: "A digital signature guarantees that the message was created by a known sender (authentication) and that the message was not altered in transit (integrity)." },
          { q: "Which protocol is the modern standard for secure web communication (replacing SSL)?", o: ["SSH", "TLS", "IPsec", "PGP"], a: 1, exp: "Transport Layer Security (TLS) is the successor to Secure Sockets Layer (SSL) and is the standard for secure web communications." },
          { q: "What is an IDS (Intrusion Detection System)?", o: ["A system that actively blocks malicious traffic", "A device or software that monitors a network or systems for malicious activity or policy violations and alerts administrators", "A type of firewall", "An antivirus program"], a: 1, exp: "An IDS is a monitoring system that detects suspicious activities and generates alerts, unlike an IPS which actively prevents them." },
          { q: "What does an IPSec VPN provide?", o: ["Data compression", "Secure, encrypted communication between networks over the internet at the IP layer", "Application-level proxying", "Load balancing"], a: 1, exp: "IPsec (Internet Protocol Security) is a secure network protocol suite that authenticates and encrypts the packets of data to provide secure encrypted communication." },
          { q: "What is salt in cryptography?", o: ["A weakness in an algorithm", "Random data added to a password before hashing to defend against dictionary and rainbow table attacks", "The key used for symmetric encryption", "A method of destroying data"], a: 1, exp: "A salt is random data that is used as an additional input to a one-way function that hashes data, passwords or passphrases." },
          { q: "What is the purpose of PKI (Public Key Infrastructure)?", o: ["To route internet traffic", "To manage digital certificates and public-key encryption", "To block DDoS attacks", "To store passwords securely"], a: 1, exp: "PKI is a set of roles, policies, hardware, software and procedures needed to create, manage, distribute, use, store and revoke digital certificates and manage public-key encryption." },
          { q: "In a DDoS (Distributed Denial of Service) attack, what is the primary goal?", o: ["To steal credit card data", "To encrypt the target's files", "To overwhelm a target server, service or network with a flood of Internet traffic, making it unavailable", "To install a backdoor"], a: 2, exp: "A DDoS attack aims to disrupt normal traffic of a targeted server, service or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic." },
          { q: "What is a Honeypot in cybersecurity?", o: ["A high-value target", "A decoy system intended to attract cyberattacks to study attacker behavior and deflect them from real targets", "A password manager", "A type of malware"], a: 1, exp: "A honeypot is a computer security mechanism set to detect, deflect, or, in some manner, counteract attempts at unauthorized use of information systems." }
        ]
      }
    ]
  }
];
