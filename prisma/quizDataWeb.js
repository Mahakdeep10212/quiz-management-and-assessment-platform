module.exports = [
  {
    category: "HTML",
    quizzes: [
      {
        title: "Advanced HTML & Semantic Web",
        description: "Deep dive into HTML5 semantic elements, APIs, and modern best practices.",
        difficulty: "MEDIUM",
        duration: 15,
        passingScore: 70,
        questions: [
          { q: "Which element represents a self-contained composition in a document?", o: ["<section>", "<article>", "<div>", "<main>"], a: 1, exp: "<article> specifies independent, self-contained content." },
          { q: "Which attribute is used to provide an advisory text for an element?", o: ["title", "alt", "src", "href"], a: 0, exp: "The title attribute provides extra information about an element, typically shown as a tooltip." },
          { q: "How do you specify that an input field must be filled out?", o: ["validate", "required", "mandatory", "placeholder"], a: 1, exp: "The required attribute specifies that an input field must be filled out before submitting." },
          { q: "Which tag is used for defining a description list?", o: ["<ul>", "<ol>", "<dl>", "<li>"], a: 2, exp: "<dl> defines a description list, <dt> defines terms, and <dd> defines descriptions." },
          { q: "Which HTML5 element is used to specify a footer for a document or section?", o: ["<bottom>", "<footer>", "<section>", "<end>"], a: 1, exp: "The <footer> element represents a footer for its nearest ancestor sectioning content." },
          { q: "What is the correct HTML for playing an audio file?", o: ["<sound>", "<music>", "<audio>", "<mp3>"], a: 2, exp: "The <audio> element is used to embed sound content in documents." },
          { q: "Which attribute is used to specify the character encoding for the HTML document?", o: ["charset", "encoding", "type", "lang"], a: 0, exp: "The charset attribute specifies the character encoding for the HTML document." },
          { q: "What does the <aside> element represent?", o: ["Navigation links", "Main content", "Content tangentially related to the main content", "A footer"], a: 2, exp: "The <aside> element represents a portion of a document whose content is only indirectly related to the document's main content." },
          { q: "How can you make a numbered list?", o: ["<dl>", "<ul>", "<list>", "<ol>"], a: 3, exp: "<ol> stands for ordered list, which creates a numbered list." },
          { q: "Which HTML element is used to define navigation links?", o: ["<nav>", "<navigate>", "<menu>", "<header>"], a: 0, exp: "The <nav> element defines a set of navigation links." }
        ]
      },
      {
        title: "HTML Forms & Accessibility",
        description: "Test your knowledge on creating accessible HTML forms.",
        difficulty: "HARD",
        duration: 20,
        passingScore: 75,
        questions: [
          { q: "Which attribute associates a <label> with an <input> element?", o: ["id", "name", "for", "type"], a: 2, exp: "The 'for' attribute of a label must be equal to the 'id' attribute of the related element to bind them together." },
          { q: "What is the purpose of the aria-label attribute?", o: ["To style text", "To define a string that labels the current element for screen readers", "To hide the element", "To create a tooltip"], a: 1, exp: "aria-label provides an accessible name for an element when there is no visible text labelling it." },
          { q: "Which input type defines a slider control?", o: ["slider", "range", "controls", "scroll"], a: 1, exp: "<input type='range'> defines a control for entering a number whose exact value is not important (like a slider)." },
          { q: "How do you group related elements in a form?", o: ["<fieldset>", "<group>", "<form-group>", "<section>"], a: 0, exp: "The <fieldset> element is used to group related elements in a form, and <legend> defines a caption for it." },
          { q: "Which HTML attribute specifies that an input field is read-only?", o: ["disabled", "readonly", "static", "locked"], a: 1, exp: "The readonly attribute specifies that an input field is read-only." },
          { q: "What does the tabindex attribute do?", o: ["Creates a table index", "Specifies the tab order of an element", "Indents the text", "Opens a new tab"], a: 1, exp: "The tabindex attribute specifies the tab order of an element (when the user uses the 'Tab' button to navigate)." },
          { q: "Which element is used to group options inside a <select> drop-down list?", o: ["<option-group>", "<optgroup>", "<group>", "<select-group>"], a: 1, exp: "The <optgroup> element is used to group related options in a drop-down list." },
          { q: "What is the correct HTML for a checkbox?", o: ["<check>", "<input type='checkbox'>", "<checkbox>", "<input type='check'>"], a: 1, exp: "<input type='checkbox'> defines a checkbox." },
          { q: "Which role attribute value identifies an element as a button for screen readers?", o: ["role='action'", "role='submit'", "role='button'", "role='click'"], a: 2, exp: "role='button' identifies an element as a button to assistive technologies." },
          { q: "Which attribute is used to provide a regular expression that the input's value must match?", o: ["regex", "pattern", "match", "format"], a: 1, exp: "The pattern attribute specifies a regular expression that the <input> element's value is checked against." }
        ]
      }
    ]
  },
  {
    category: "CSS",
    quizzes: [
      {
        title: "CSS Fundamentals",
        description: "Check your knowledge of basic CSS selectors, colors, and text formatting.",
        difficulty: "EASY",
        duration: 15,
        passingScore: 60,
        questions: [
          { q: "Which CSS property is used to change the text color of an element?", o: ["fgcolor", "text-color", "color", "font-color"], a: 2, exp: "The 'color' property is used to set the color of the text." },
          { q: "Which CSS property controls the text size?", o: ["font-style", "text-size", "font-size", "text-style"], a: 2, exp: "The 'font-size' property sets the size of the font." },
          { q: "What is the correct CSS syntax for making all the <p> elements bold?", o: ["p {text-size:bold;}", "p {font-weight:bold;}", "<p style='text-size:bold;'>", "p {font-style:bold;}"], a: 1, exp: "The 'font-weight' property sets how thick or thin characters in text should be displayed." },
          { q: "How do you select an element with id 'demo'?", o: ["#demo", ".demo", "demo", "*demo"], a: 0, exp: "The hash (#) selector selects elements with a specific id." },
          { q: "How do you select elements with class name 'test'?", o: ["#test", ".test", "test", "*test"], a: 1, exp: "The period (.) selector selects elements with a specific class." },
          { q: "Which property is used to change the background color?", o: ["bgcolor", "color", "background-color", "bg-color"], a: 2, exp: "The 'background-color' property sets the background color of an element." },
          { q: "What is the default value of the position property?", o: ["relative", "fixed", "absolute", "static"], a: 3, exp: "HTML elements are positioned static by default. A static positioned element is always positioned according to the normal flow of the page." },
          { q: "How do you make each word in a text start with a capital letter?", o: ["text-transform:capitalize", "text-transform:uppercase", "transform:capitalize", "text-style:capital"], a: 0, exp: "The text-transform property controls the capitalization of text. 'capitalize' transforms the first character of each word to uppercase." },
          { q: "Which CSS property is used to create space between the content and its border?", o: ["margin", "padding", "spacing", "border-spacing"], a: 1, exp: "Padding clears an area around the content (inside the border)." },
          { q: "Which of these colors is represented in HEX format?", o: ["rgb(255, 0, 0)", "red", "hsl(0, 100%, 50%)", "#ff0000"], a: 3, exp: "HEX colors begin with a hash (#) followed by 3 or 6 hex characters." }
        ]
      },
      {
        title: "CSS Flexbox & Grid",
        description: "Test your skills on modern CSS layout systems.",
        difficulty: "MEDIUM",
        duration: 20,
        passingScore: 70,
        questions: [
          { q: "Which property is required to make an element a flex container?", o: ["display: flex;", "flex-direction: row;", "align-items: center;", "display: block;"], a: 0, exp: "Setting 'display: flex' or 'display: inline-flex' on an element makes it a flex container." },
          { q: "What is the default value of flex-direction?", o: ["column", "row", "row-reverse", "column-reverse"], a: 1, exp: "By default, flex items are laid out in a row (left to right in LTR)." },
          { q: "Which property aligns flex items along the main axis?", o: ["align-items", "align-content", "justify-content", "flex-align"], a: 2, exp: "justify-content aligns items along the main axis (horizontally if flex-direction is row)." },
          { q: "Which CSS Grid property specifies the number and size of columns?", o: ["grid-columns", "grid-template-columns", "grid-auto-columns", "grid-layout-columns"], a: 1, exp: "grid-template-columns defines the line names and track sizing functions of the grid columns." },
          { q: "What unit is specifically designed for CSS Grid to represent a fraction of the available space?", o: ["%", "vw", "fr", "rem"], a: 2, exp: "The 'fr' unit represents a fraction of the available space in the grid container." },
          { q: "How do you make a flex item grow to fill available space?", o: ["flex-grow: 1;", "flex-size: 1;", "flex-fill: true;", "grow: 1;"], a: 0, exp: "The flex-grow property dictates what amount of the available space inside the flex container the item should take up." },
          { q: "Which property controls the alignment of items on the cross axis in Flexbox?", o: ["justify-content", "align-items", "align-content", "text-align"], a: 1, exp: "align-items aligns flex items along the cross axis (vertically if flex-direction is row)." },
          { q: "In CSS Grid, how do you span an item across 3 columns?", o: ["grid-column: 3;", "grid-span: 3;", "grid-column: span 3;", "column-span: 3;"], a: 2, exp: "grid-column: span 3 makes the item span across three column tracks." },
          { q: "What does flex-wrap: wrap do?", o: ["Wraps text inside the item", "Forces items onto a single line", "Allows items to wrap onto multiple lines", "Reverses the order of items"], a: 2, exp: "flex-wrap: wrap specifies that flex items will wrap onto multiple lines, from top to bottom." },
          { q: "Which property creates a gap between grid rows and columns?", o: ["margin", "padding", "gap", "spacing"], a: 2, exp: "The 'gap' property (previously grid-gap) sets the gaps (gutters) between rows and columns." }
        ]
      },
      {
        title: "Advanced CSS Layouts",
        description: "Challenge yourself with complex CSS layout concepts and responsive design.",
        difficulty: "HARD",
        duration: 25,
        passingScore: 75,
        questions: [
          { q: "Which media query targets devices with a viewport width of 768px or larger?", o: ["@media (max-width: 768px)", "@media (min-width: 768px)", "@media (width: 768px)", "@media screen and 768px"], a: 1, exp: "min-width applies rules when the viewport is at least the specified width." },
          { q: "What does the z-index property control?", o: ["The size of an element", "The horizontal position", "The stacking order of elements", "The opacity"], a: 2, exp: "z-index specifies the z-order of a positioned element and its descendants. Higher numbers overlay lower ones." },
          { q: "Which CSS function can be used to perform calculations?", o: ["calc()", "compute()", "math()", "val()"], a: 0, exp: "The calc() CSS function lets you perform calculations when specifying CSS property values." },
          { q: "What does 'position: sticky' do?", o: ["Acts like fixed at all times", "Acts like static at all times", "Toggles between relative and fixed depending on scroll position", "Removes the element from document flow completely"], a: 2, exp: "A sticky element toggles between relative and fixed, depending on the scroll position." },
          { q: "Which pseudo-class targets an element that is the only child of its parent?", o: [":first-child", ":only-child", ":last-child", ":single"], a: 1, exp: "The :only-child pseudo-class represents any element which is the only child of its parent." },
          { q: "What is the difference between 'opacity: 0' and 'visibility: hidden'?", o: ["They are identical", "opacity:0 removes it from the layout, visibility doesn't", "visibility:hidden leaves the space, opacity:0 leaves the space but allows clicks", "visibility:hidden hides it and makes it unclickable, opacity:0 hides it visually but it remains clickable"], a: 3, exp: "opacity: 0 makes the element fully transparent but it still receives events. visibility: hidden hides it and prevents events." },
          { q: "In CSS animations, what does the @keyframes rule do?", o: ["Specifies the duration", "Specifies the animation code/states", "Links the animation to an element", "Triggers the animation on hover"], a: 1, exp: "The @keyframes rule specifies the animation code by defining styles at various points during the animation sequence." },
          { q: "Which property is used to apply a 2D or 3D transformation to an element?", o: ["transition", "transform", "translate", "animate"], a: 1, exp: "The transform property allows you to rotate, scale, skew, or translate an element." },
          { q: "What is the result of 'box-sizing: border-box'?", o: ["Padding and border are included in the element's total width and height", "Borders are removed", "Padding is added outside the element", "The box becomes a circle"], a: 0, exp: "border-box tells the browser to account for any border and padding in the values you specify for an element's width and height." },
          { q: "How do you select every <a> element whose href attribute value begins with 'https'?", o: ["a[href='https']", "a[href*='https']", "a[href$='https']", "a[href^='https']"], a: 3, exp: "The [attribute^=value] selector matches every element whose attribute value begins with a specified value." }
        ]
      }
    ]
  },
  {
    category: "JavaScript",
    quizzes: [
      {
        title: "Advanced JavaScript",
        description: "Test your deep understanding of closures, prototypes, and advanced concepts.",
        difficulty: "HARD",
        duration: 25,
        passingScore: 75,
        questions: [
          { q: "What is a closure in JavaScript?", o: ["A function inside another function", "A function that has access to its outer function scope even after the outer function has returned", "A loop that never ends", "A syntax error"], a: 1, exp: "A closure gives you access to an outer function's scope from an inner function, even after the outer function has finished executing." },
          { q: "What does the 'this' keyword refer to in a regular function (non-strict mode)?", o: ["The global object (window)", "The function itself", "undefined", "The document object"], a: 0, exp: "In non-strict mode, 'this' in a regular function call points to the global object." },
          { q: "Which method is used to bind a specific context (this) to a function and return a new function?", o: ["call()", "apply()", "bind()", "attach()"], a: 2, exp: "bind() creates a new function that, when called, has its 'this' keyword set to the provided value." },
          { q: "What is the output of: console.log(typeof NaN)?", o: ["NaN", "number", "undefined", "object"], a: 1, exp: "In JavaScript, NaN (Not-a-Number) is classified as a number primitive." },
          { q: "How do you check if an object 'obj' is an array?", o: ["typeof obj === 'array'", "obj instanceof Array", "Array.isArray(obj)", "Both B and C"], a: 3, exp: "Both obj instanceof Array and Array.isArray(obj) can be used, though Array.isArray is generally preferred across iframes." },
          { q: "What is event bubbling?", o: ["Events triggering from the document down to the target", "Events triggering from the target up to the document root", "Preventing default event behavior", "Creating custom events"], a: 1, exp: "Event bubbling is when an event starts at the most specific element and then flows upward toward the least specific element." },
          { q: "What is the result of '1' - - '1'?", o: ["0", "11", "2", "NaN"], a: 2, exp: "The second minus acts as a unary negation. - '1' becomes -1. Then '1' - (-1) converts the first '1' to 1, resulting in 1 + 1 = 2." },
          { q: "What does Object.freeze() do?", o: ["Makes an object immutable (cannot add, delete, or change properties)", "Prevents new properties from being added, but allows changes to existing ones", "Makes an object invisible", "Clones an object"], a: 0, exp: "Object.freeze() freezes an object. A frozen object can no longer be changed; freezing an object prevents new properties from being added to it, existing properties from being removed, etc." },
          { q: "Which of the following is a falsy value in JavaScript?", o: ["'0'", "[]", "0", "{}"], a: 2, exp: "0 is a falsy value. Strings ('0'), empty arrays ([]), and empty objects ({}) are truthy." },
          { q: "What is the purpose of a Symbol in JavaScript?", o: ["To define a constant", "To create a unique and immutable identifier for object properties", "To represent an icon", "To parse XML"], a: 1, exp: "Symbols are unique, immutable primitive values and may be used as the key of an object property." }
        ]
      },
      {
        title: "JavaScript ES6+ & Async Programming",
        description: "Test your knowledge on Promises, async/await, arrow functions, and ES6 features.",
        difficulty: "MEDIUM",
        duration: 20,
        passingScore: 70,
        questions: [
          { q: "Which keyword defines a block-scoped variable that cannot be reassigned?", o: ["let", "var", "const", "static"], a: 2, exp: "const defines a block-scoped variable that cannot be reassigned." },
          { q: "How does an arrow function differ from a regular function regarding 'this'?", o: ["It has no difference", "It creates its own 'this' context", "It inherits 'this' from its enclosing lexical context", "It always binds 'this' to window"], a: 2, exp: "Arrow functions do not bind their own 'this', instead, they inherit the one from the parent scope." },
          { q: "What does the spread operator (...) do when used on an array?", o: ["Concatenates strings", "Expands an iterable into individual elements", "Multiplies numbers", "Deletes the array"], a: 1, exp: "The spread operator expands an iterable (like an array) into its individual elements." },
          { q: "Which object is used to handle asynchronous operations in ES6?", o: ["Callback", "Timeout", "Promise", "Async"], a: 2, exp: "A Promise represents the eventual completion (or failure) of an asynchronous operation and its resulting value." },
          { q: "What is the correct syntax for destructuring an object?", o: ["const { name } = user;", "const [ name ] = user;", "const name = user.name;", "const { user.name } = name;"], a: 0, exp: "Destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables." },
          { q: "Which keyword must be used before 'await' in a function?", o: ["promise", "async", "defer", "wait"], a: 1, exp: "The await keyword can only be used inside an async function." },
          { q: "What does Promise.all() do?", o: ["Rejects immediately if one promise fails", "Waits for all promises to fulfill, or rejects if any promise rejects", "Waits for the first promise to fulfill", "Runs promises synchronously"], a: 1, exp: "Promise.all() takes an iterable of promises and returns a single Promise that resolves when all passed promises resolve, or rejects with the reason of the first passed promise that rejects." },
          { q: "Which ES6 feature allows embedding expressions inside string literals?", o: ["Arrow functions", "Template literals", "Destructuring", "Spread operator"], a: 1, exp: "Template literals (using backticks) allow embedded expressions using ${expression}." },
          { q: "How do you specify a default parameter in an ES6 function?", o: ["function(x){ x = x || 5; }", "function(x=5){}", "function(x: 5){}", "function(x -> 5){}"], a: 1, exp: "Default function parameters allow named parameters to be initialized with default values if no value or undefined is passed." },
          { q: "What is a module in JavaScript?", o: ["A function inside an object", "A reusable piece of code that encapsulates implementation details and exposes a public API", "A database connection", "A built-in class"], a: 1, exp: "Modules allow you to break up your code into separate files and encapsulate logic, exporting only what is needed." }
        ]
      }
    ]
  },
  {
    category: "React",
    quizzes: [
      {
        title: "React Hooks & State Management",
        description: "Master the React Hooks API and component state.",
        difficulty: "MEDIUM",
        duration: 20,
        passingScore: 70,
        questions: [
          { q: "Which hook is used to perform side effects in a functional component?", o: ["useState", "useReducer", "useEffect", "useMemo"], a: 2, exp: "useEffect is used to perform side effects like data fetching, subscriptions, or manually changing the DOM." },
          { q: "What is the purpose of the dependency array in useEffect?", o: ["To specify which state variables to update", "To determine when the effect should re-run", "To pass props to the effect", "To define the return value"], a: 1, exp: "The dependency array tells React to only re-run the effect if one of the dependencies has changed." },
          { q: "Which hook is best suited for complex state logic that involves multiple sub-values?", o: ["useState", "useContext", "useReducer", "useCallback"], a: 2, exp: "useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one." },
          { q: "What does useContext do?", o: ["Creates a new context", "Consumes a context value", "Updates a context value", "Deletes a context"], a: 1, exp: "useContext accepts a context object and returns the current context value for that context." },
          { q: "How do you optimize a child component from re-rendering unnecessarily when its parent re-renders?", o: ["React.memo", "useEffect", "useState", "useRef"], a: 0, exp: "React.memo is a higher order component that memoizes the rendered output of the wrapped component preventing unnecessary re-renders." },
          { q: "What does useRef return?", o: ["An array", "A string", "A mutable ref object whose .current property is initialized to the passed argument", "A boolean"], a: 2, exp: "useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue)." },
          { q: "Which hook would you use to memoize a computational expensive function's return value?", o: ["useCallback", "useMemo", "useRef", "useEffect"], a: 1, exp: "useMemo will only recompute the memoized value when one of the dependencies has changed." },
          { q: "What is the difference between useCallback and useMemo?", o: ["There is no difference", "useCallback returns a memoized callback, useMemo returns a memoized value", "useMemo returns a callback, useCallback returns a value", "useCallback is for classes, useMemo is for functions"], a: 1, exp: "useCallback(fn, deps) is equivalent to useMemo(() => fn, deps)." },
          { q: "Can you use hooks inside a standard JavaScript function (non-component)?", o: ["Yes, anywhere", "No, only in functional components or custom hooks", "Yes, but only if it starts with 'use'", "No, only in class components"], a: 1, exp: "Rules of Hooks: Only call Hooks at the top level of React function components or custom Hooks." },
          { q: "How do you trigger a re-render in a component using useState?", o: ["Call this.setState()", "Update the variable directly", "Call the state updater function returned by useState", "Call forceUpdate()"], a: 2, exp: "Calling the state updater function returned by useState triggers a re-render with the new state value." }
        ]
      },
      {
        title: "Advanced React",
        description: "Test your knowledge on React architecture, performance, and advanced patterns.",
        difficulty: "HARD",
        duration: 25,
        passingScore: 75,
        questions: [
          { q: "What is a Higher-Order Component (HOC)?", o: ["A component that renders another component", "A function that takes a component and returns a new component", "A component at the top of the tree", "A component using hooks"], a: 1, exp: "A higher-order component is a function that takes a component and returns a new component, used for reusing component logic." },
          { q: "What is the purpose of React Portals?", o: ["To navigate between pages", "To render children into a DOM node that exists outside the DOM hierarchy of the parent component", "To fetch data from external APIs", "To transport state between components"], a: 1, exp: "Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component (e.g. for modals)." },
          { q: "In React, what are Error Boundaries?", o: ["Try/catch blocks in useEffect", "Components that catch JavaScript errors anywhere in their child component tree", "A way to validate props", "HTTP error handlers"], a: 1, exp: "Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI." },
          { q: "What is Context API primarily used for?", o: ["Routing", "State management for deeply nested components to avoid prop drilling", "Handling forms", "Animations"], a: 1, exp: "Context provides a way to pass data through the component tree without having to pass props down manually at every level." },
          { q: "Which method in a class component is invoked immediately after updating occurs?", o: ["componentDidMount", "componentWillUnmount", "componentDidUpdate", "getDerivedStateFromProps"], a: 2, exp: "componentDidUpdate() is invoked immediately after updating occurs. This method is not called for the initial render." },
          { q: "What does strict mode do in React?", o: ["Throws errors for unused variables", "Highlights potential problems in an application by running extra checks and warnings in development", "Prevents the use of ANY third party libraries", "Makes the app run faster in production"], a: 1, exp: "StrictMode is a tool for highlighting potential problems in an application. It does not render any visible UI." },
          { q: "What is React Fiber?", o: ["A routing library", "The new reconciliation engine in React 16 for better rendering performance", "A UI component library", "A state management tool"], a: 1, exp: "React Fiber is the reimplementation of React's core algorithm, aimed at increasing its suitability for areas like animation, layout, and gestures." },
          { q: "How can you load a component lazily in React?", o: ["Using setTimeout", "Using React.lazy() and Suspense", "Using async/await on the import statement directly in JSX", "It's not possible"], a: 1, exp: "The React.lazy function lets you render a dynamic import as a regular component, usually wrapped in a <Suspense> boundary." },
          { q: "What is a 'controlled component' in React?", o: ["A component controlled by Redux", "A form element whose value is controlled by React state", "A component that doesn't accept props", "A component rendered inside a Portal"], a: 1, exp: "In HTML, form elements maintain their own state. In React, a controlled component is one where React controls the value via state." },
          { q: "What is the Virtual DOM?", o: ["A real DOM tree stored on the server", "An exact duplicate of the browser's DOM maintained in memory by React to optimize rendering", "A CSS styling technique", "A browser plugin"], a: 1, exp: "The virtual DOM is a programming concept where an ideal, or 'virtual', representation of a UI is kept in memory and synced with the 'real' DOM." }
        ]
      }
    ]
  },
  {
    category: "Node.js",
    quizzes: [
      {
        title: "Node.js Fundamentals",
        description: "Test your understanding of the Node.js runtime and core modules.",
        difficulty: "EASY",
        duration: 15,
        passingScore: 60,
        questions: [
          { q: "What engine powers Node.js?", o: ["SpiderMonkey", "V8", "Chakra", "WebKit"], a: 1, exp: "Node.js is built on Chrome's V8 JavaScript engine." },
          { q: "Which core module is used to create a web server?", o: ["net", "http", "web", "server"], a: 1, exp: "The 'http' module allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP) and create web servers." },
          { q: "What does the 'fs' module stand for?", o: ["File System", "File Server", "Forward System", "File Secure"], a: 0, exp: "The 'fs' (File System) module allows you to work with the file system on your computer." },
          { q: "How do you include an external module in Node.js?", o: ["import()", "require()", "include()", "load()"], a: 1, exp: "In CommonJS (the default module system for Node), 'require()' is used to load modules." },
          { q: "Node.js is traditionally single-threaded. How does it handle concurrent requests?", o: ["By creating a new thread per request", "Using an asynchronous, event-driven architecture and the Event Loop", "It doesn't; requests queue up", "Using Web Workers"], a: 1, exp: "Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient despite being single-threaded." },
          { q: "What is NPM?", o: ["Node Process Manager", "Node Package Manager", "New Project Module", "Node Programming Method"], a: 1, exp: "npm is the default package manager for the JavaScript runtime environment Node.js." },
          { q: "Which object provides information about the current Node.js process?", o: ["node", "process", "runtime", "env"], a: 1, exp: "The process object provides information about, and control over, the current Node.js process." },
          { q: "What is the purpose of package.json?", o: ["To write JavaScript code", "To configure the database", "To store metadata for a project, including dependencies and scripts", "To style the application"], a: 2, exp: "A package.json file holds various metadata relevant to the project and manages the project's dependencies." },
          { q: "Which command runs a Node.js file named 'app.js'?", o: ["run app.js", "node app.js", "npm app.js", "start app.js"], a: 1, exp: "'node app.js' executes the file using the Node.js runtime." },
          { q: "What does __dirname represent?", o: ["The file name of the current module", "The directory name of the current module", "The root directory of the server", "A global variable for user data"], a: 1, exp: "__dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file." }
        ]
      },
      {
        title: "Express.js & REST APIs",
        description: "Assess your ability to build web APIs using Express.js.",
        difficulty: "MEDIUM",
        duration: 20,
        passingScore: 70,
        questions: [
          { q: "What is Express.js?", o: ["A database", "A fast, unopinionated, minimalist web framework for Node.js", "A frontend framework", "A package manager"], a: 1, exp: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications." },
          { q: "How do you define a GET route in Express?", o: ["app.get('/route', callback)", "app.route('GET', '/route')", "app.add('/route', callback)", "app.receive('/route', callback)"], a: 0, exp: "app.get() routes HTTP GET requests to the specified path with the specified callback functions." },
          { q: "What is middleware in Express?", o: ["A database connection", "Functions that have access to the request and response objects, and the next middleware function", "A template engine", "The final response sent to the client"], a: 1, exp: "Middleware functions perform tasks like executing code, making changes to request/response objects, ending the cycle, or calling the next middleware." },
          { q: "Which object contains route parameters (like /users/:id)?", o: ["req.body", "req.query", "req.params", "req.data"], a: 2, exp: "req.params is an object containing properties mapped to the named route parameters." },
          { q: "How do you access JSON data sent in a POST request body in Express 4.16+?", o: ["req.body (using express.json() middleware)", "req.data", "req.json", "req.payload"], a: 0, exp: "You must use express.json() middleware to parse incoming requests with JSON payloads, which populates req.body." },
          { q: "What HTTP status code typically represents a successful resource creation?", o: ["200", "201", "204", "400"], a: 1, exp: "201 Created indicates the request has succeeded and has led to the creation of a resource." },
          { q: "What does the 'next' function do in middleware?", o: ["Sends a response to the client", "Throws an error", "Passes control to the next middleware function in the stack", "Restarts the server"], a: 2, exp: "If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware." },
          { q: "Which HTTP method is typically used to update an existing resource completely?", o: ["POST", "PATCH", "PUT", "DELETE"], a: 2, exp: "PUT is used to replace a resource entirely, whereas PATCH is used for partial updates." },
          { q: "What is CORS?", o: ["Cross-Origin Resource Sharing", "Centralized Object Routing System", "Control Origin Request Server", "Cross-Object Reference Syntax"], a: 0, exp: "CORS is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources." },
          { q: "How do you serve static files in Express?", o: ["Using app.static()", "Using express.static() middleware", "Using fs.serve()", "It's automatic"], a: 1, exp: "express.static is a built-in middleware function in Express used to serve static files such as images, CSS, and JS." }
        ]
      },
      {
        title: "Advanced Node.js",
        description: "Test your knowledge on streams, buffers, clustering, and performance.",
        difficulty: "HARD",
        duration: 25,
        passingScore: 75,
        questions: [
          { q: "What is a Buffer in Node.js?", o: ["A temporary holding spot for data being transferred", "A memory leak", "A type of database", "A caching mechanism in NPM"], a: 0, exp: "The Buffer class provides a way of handling streams of binary data." },
          { q: "Which of these is NOT a type of Stream in Node.js?", o: ["Readable", "Writable", "Duplex", "Receivable"], a: 3, exp: "The 4 types of streams are Readable, Writable, Duplex, and Transform." },
          { q: "What does the 'cluster' module do?", o: ["Groups related code files together", "Allows creation of child processes that share server ports to handle load", "Connects multiple databases", "Minifies JavaScript code"], a: 1, exp: "A single instance of Node.js runs in a single thread. The cluster module allows you to create child processes (workers) that run simultaneously and share the same server port." },
          { q: "What is the Event Loop in Node.js responsible for?", o: ["Parsing JSON", "Handling asynchronous callbacks and non-blocking I/O operations", "Connecting to SQL databases", "Rendering HTML"], a: 1, exp: "The event loop is what allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel whenever possible." },
          { q: "Which method is used to execute a shell command from Node.js?", o: ["child_process.exec()", "os.shell()", "process.run()", "system.cmd()"], a: 0, exp: "The child_process module provides the ability to spawn subprocesses in a manner that is similar to popen(3), using methods like exec()." },
          { q: "In the event loop, which phase executes setTimeout callbacks?", o: ["Timers phase", "Poll phase", "Check phase", "Pending callbacks phase"], a: 0, exp: "The timers phase executes callbacks scheduled by setTimeout() and setInterval()." },
          { q: "What is the purpose of setImmediate()?", o: ["To execute code in the next tick of the event loop", "To execute code synchronously", "To execute code in the Check phase, immediately after the Poll phase completes", "To delay execution by 1ms"], a: 2, exp: "setImmediate() is designed to execute a script once the current poll phase completes (in the check phase)." },
          { q: "How do you pipe a readable stream to a writable stream?", o: ["readable.to(writable)", "readable.pipe(writable)", "writable.pull(readable)", "stream.connect(readable, writable)"], a: 1, exp: "The pipe() method attaches a writable stream to a readable stream." },
          { q: "What is process.nextTick() used for?", o: ["Scheduling a callback to be invoked in the next phase of the event loop", "Scheduling a callback to be invoked immediately after the current operation completes, before the event loop continues", "Creating a new timer", "Ending the Node process"], a: 1, exp: "process.nextTick() adds the callback to the next tick queue, which is processed after the current operation and before the event loop continues." },
          { q: "Which Node.js module provides utilities for dealing with file and directory paths?", o: ["fs", "url", "path", "dir"], a: 2, exp: "The 'path' module provides utilities for working with file and directory paths, resolving OS-specific path differences." }
        ]
      }
    ]
  }
];
