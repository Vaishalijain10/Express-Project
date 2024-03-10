module.exports = [
  {
    id: "handlebars",
    title: "Working with handlebars",
    upvotes: 0,
    comments: [
      {
        author: "Vj",
        text: "GR8",
        createdAt: new Date().toLocaleDateString(),
      },
    ],
    content: [
      'Handlebars is a simple and lightweight template engine that enables you to create HTML templates with placeholders for dynamic content. These placeholders, known as "handlebars," are replaced with actual data when the template is rendered.',
      "Templates: Handlebars templates are regular HTML files with embedded handlebars expressions.",
      "Data: You provide data to the Handlebars template as an object. This data can be dynamically generated from your JavaScript code or fetched from an external data source.",
      "Compilation: Before rendering a template, Handlebars compiles it into a JavaScript function. This function takes the data as input and returns the rendered HTML string.",
      "Rendering: To render a template, you call the compiled function with the data object. Handlebars replaces the handlebars expressions in the template with the corresponding values from the data.",
      "Output: The output of the rendering process is a complete HTML string with dynamic content inserted into the template. This HTML can then be inserted into the DOM or sent as a response in a server-side application.",
    ],
  },
  {
    id: "Features",
    title: "Key Features of Handlebars",
    upvotes: 0,
    comments: [],
    content: [
      "Simplicity: Handlebars syntax is easy to learn and use, making it accessible to beginners.",
      "Reusability: Templates can be reused across different parts of your application, promoting code modularity and maintainability.",
      "Separation of Concerns: Handlebars allows you to separate your HTML structure from your JavaScript logic, which improves code organization and readability.",
      "Extensibility: Handlebars supports helpers, which are custom functions that extend its functionality. Helpers enable you to perform complex operations within templates.",
    ],
  },
  {
    id: "Conclusion",
    title: "Conclusion about handlebars",
    upvotes: 0,
    comments: [],
    content: [
      "Handlebars is a versatile templating engine that simplifies the process of generating dynamic HTML content in JavaScript applications. By using Handlebars, you can create clean and maintainable code that efficiently handles data rendering and presentation.",
      "Whether you are building a simple website or a complex web application, Handlebars can streamline your development process and enhance the user experience.",
    ],
  },
];
