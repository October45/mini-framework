# Mini Framework
## Description 
We have designed this framework to provide an easy and intuitive way to handle these essential aspects of web development.  

## Features

- Abstracting the DOM Routing System
- State Management
- Event Handling

## Usage/Examples

To use the framework, you need to include the following script tag in your HTML file:
```html
<script src="framework.js"></script>
```
With src being the path to the framework.js file.

### Abstracting the DOM Routing System
With this structured representation, you can easily manipulate the DOM by making changes to the JSON object.

```json
{
  "tag": "html",
  "attrs": {},
  "children": [
    {
      "tag": "div",
      "attrs": {
        "class": "nameSubm"
      },
      "children": [
        {
          "tag": "input",
          "attrs": {
            "type": "text",
            "placeholder": "Insert Name"
          }
        },
        {
          "tag": "input",
          "attrs": {
            "type": "submit",
            "placeholder": "Submit"
          }
        }
      ]
    }
  ]
}
```

### State Management

With this framework, you can easily manage and synchronize the state across multiple pages. This ensures that the state is accessible at all times and can be updated based on user actions.

### Event Handling

We have implemented a custom event handling mechanism that is different from the standard addEventListener() method. This allows you to handle events such as scrolling, clicking, and keybindings in a more efficient and intuitive way.

## Documentation

Here's what you can expect to find in the [Documentation](https://github.com/october45/mini-framework/mini-framework.md) :
- Explanation of the features of this framework
- Code examples and explanations on how to:
- Create an element
- Create an event
- Nest elements
- Add attributes to an element
- Explanation of why things work the way they work in this framework

 
## Authors

- [@October](https://github.com/october45)

## License

[MIT](https://choosealicense.com/licenses/mit/)

