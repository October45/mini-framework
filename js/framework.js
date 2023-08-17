// Declaring the state and the functions to save and load the state
var state = {
    todo: [],
    selectedBtn: 1,
    page: '/#',
    filter: '',
    hideInfo: false,
    hideClear: false,
    allChecked: false,
};

/**
 * Saves the current state to the local storage
 *
 * @param {JSON} currentState
 */
function saveState(currentState) {
    localStorage.setItem('state', JSON.stringify(currentState));
}

/**
 * Loads the state from local storage
 */
function loadState() {
    let data = localStorage.getItem('state');
    if (data) {
        state = JSON.parse(data);
    }
}

/**
 * Creates a child element and appends it to the parent
 *
 * @param {Node | HTMLElement} parent - The element which the child will be appended to
 * @param {Node | HTMLElement | string} child - The child to be appended or a HTML text representation of the child
 */
function createChild(parent, child) {
    if (child instanceof Node) {
        parent.appendChild(child);
    } else {
        parent.appendChild(document.createTextNode(child));
    }
}

/**
 * Removes a child element from the parent
 *
 * @param {Node | HTMLElement} parent - The element which the child will be removed from
 * @param {Node | HTMLElement} child - The child to be removed
 */
function removeChild(parent, child) {
    parent.removeChild(child);
}

/**
 * Creates a structure of elements from a JSON object
 * the JSON object must have the following structure:
 * ```json
 *  {
 *      tag: 'tagName', // The tag name of the element
 *      attri: ['attributeName', 'attributeValue', ...], // The attributes of the element
 *      children: [ // The children of the element
 *          {
 *              tag: 'tagName',
 *              attri: ['attributeName', 'attributeValue', ...],
 *              children: [...]
 *          },
 *         ...
 *     ]
 *  }
 * ```
 * @param {JSON} structure
 * @returns {Node | HTMLElement}
 */
function createStructure(structure) {
    let parent = document.createElement(structure.tag);
    if ('attri' in structure) {
        setAttributes(parent, structure.attri);
    }
    if ('children' in structure) {
        if (Array.isArray(structure.children)) {
            for (const child of structure.children) {
                createChild(parent, child);
            }
        } else {
            createChild(parent, structure.children);
        }
    }

    return parent;
}

/**
 * Sets the attributes of an element
 * Takes in an array of key-value pairs of attributes
 * Example: ["class", "todo", "id", "1"]
 *
 * @param {Node | HTMLElement} element - The element to set the attributes to
 * @param {*} attributes - An array of key-value pairs of attributes
 */
function setAttributes(element, attributes) {
    for (let i = 0; i < attributes.length; i += 2) {
        let key = attributes[i];
        let value = attributes[i + 1];
        if (value === null || value === undefined) {
            continue;
        }
        element.setAttribute(key, value);
    }
}

/**
 * Gets the parent of an element
 * Returns the parent element after `num` steps
 * Default value of `num` is 2
 *
 * @param {Node | HTMLElement} element - The child element to get the parent of
 * @param {number} num - The number of steps up the DOM tree to go
 * @returns {Node | HTMLElement}
 */
function getParent(element, num = 2) {
    for (let i = 0; i < num; i++) {
        element = element.parentElement;
    }
    return element;
}

/**
 * Redirects the page to the given url
 *
 * @param {string} url
 */
function redirect(url) {
    window.history.pushState(null, null, url);
}

/**
 * Adds an event listener to an element with the given callback function to be called when the event is triggered
 *
 * @param {string} eventType - The type of event to add (e.g. 'click', 'change')
 * @param {EventTarget} element - The element to add the event to
 * @param {Function} callback - The callback function to be called when the event is triggered
 */
function addEvent(eventType, element, callback) {
    element.addEventListener(eventType, callback);
}

/**
 *
 * @param {string} eventType - The type of event to remove (e.g. 'click', 'change')
 * @param {EventTarget} element - The element to remove the event from
 */
function removeEvent(eventType, element) {
    element.removeEventListener(eventType);
}
