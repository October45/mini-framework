var todoApp;

class TodoApp {
    constructor() {
        this.input;
        this.list;
        this.clear;
        this.checkAllBox;
        this.checkAllLabel;
        this.filters;
        this.edit;

        loadState();

        const { userAgent, appVersion, platform, ...cleanState } = state;
        this.routes = [
            { path: '#/', filter: '' },
            { path: '#/active', filter: 'active' },
            { path: '#/completed', filter: 'completed' },
        ];
        this.state = cleanState;

        this.handleNewTodo = this.handleNewTodo.bind(this);
        this.handleChangeTodoText = this.handleChangeTodoText.bind(this);
        this.handleChangeTodoText = this.handleChangeTodoText.bind(this);
        this.handleTodoTextClick = this.handleTodoTextClick.bind(this);
        this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
        this.handleTodoCheckBox = this.handleTodoCheckBox.bind(this);
        this.handleCheckAll = this.handleCheckAll.bind(this);
        this.handleClearChecked = this.handleClearChecked.bind(this);
        this.handleLinkChange = this.handleLinkChange.bind(this);

        this.init();
        this.navigate(this.state.page);
    }

    init() {
        this.input = document.getElementsByClassName('new-todo')[0];
        this.list = document.getElementsByClassName('todo-list')[0];
        this.count = document.getElementsByClassName('todo-count')[0];
        this.clear = document.getElementsByClassName('clear-completed')[0];
        this.checkAllBox = document.getElementById('toggle-all');
        this.checkAllLabel = document.querySelector('.main label');
        this.filters = document.getElementsByClassName('filters')[0];

        if (
            !this.input ||
            !this.list ||
            !this.count ||
            !this.clear ||
            !this.checkAllBox ||
            !this.checkAllLabel ||
            !this.filters
        ) {
            console.error('Todo input or todo list element not found.');
            return;
        }

        addEvent('keypress', this.input, this.handleNewTodo);
        addEvent('click', this.clear, this.handleClearChecked);
        addEvent('change', this.checkAllBox, this.handleCheckAll);

        let links = document.querySelectorAll('.filters a');

        for (let i = 0; i < links.length; i++) {
            let a = links[i];

            addEvent('click', a, this.handleLinkChange);
        }
    }

    navigate(url) {
        if (url == '/' || url == '') {
            redirect(this.routes[0].path);
            return;
        }
        redirect(url);
        this.state.page = url;
        const route = this.routes.find((route) => route.path === url);
        if (route == undefined) {
            this.state.filter = '';
        } else {
            this.state.filter = route.filter;
        }
        let s = document.getElementsByClassName('selected')[0];
        if (s) {
            s.classList = '';
        }
        let l = document.querySelector(`a[href="${route?.path}"]`);
        if (l) {
            l.classList = 'selected';
        }
        saveState(this.state);
        this.render();
    }

    handleNewTodo(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.add();
        }
    }

    handleRemoveTodo(event) {
        const targetElement = event.target;
        const todoId = this.getId(getParent(targetElement));

        this.delete(todoId);
    }

    handleTodoCheckBox(event) {
        const targetElement = event.target;
        const todoId = this.getId(getParent(targetElement));

        this.updateToggle(todoId);

        this.render();
        saveState(this.state);
    }

    handleTodoTextClick(event) {
        const targetElement = event.target;
        let parent = getParent(targetElement);
        let todo = this.getTodo(this.getId(parent));

        if (!parent.classList.contains('completed')) {
            parent.classList += ' ' + 'editing';
        } else {
            parent.classList = 'editing';
        }

        this.edit = createStructure({
            tag: 'input',
            attri: ['class', 'edit'],
        });

        this.edit.value = todo.text;

        addEvent('keypress', this.edit, this.handleChangeTodoText);
        addEvent('blur', this.edit, this.handleChangeTodoText);

        createChild(parent, this.edit);

        this.edit.focus();
        saveState(this.state);
    }

    handleChangeTodoText(event) {
        if (this.edit == null) {
            return;
        }
        if (
            event.key == 'Enter' ||
            event.key == 'TAB' ||
            event.type == 'blur'
        ) {
            event.preventDefault();

            const targetElement = event.target;

            removeEvent('blur', targetElement, this.handleChangeTodoText);
            removeEvent('keypress', targetElement, this.handleChangeTodoText);

            const text = this.edit.value.trim();
            let parent = getParent(targetElement, 1);
            removeChild(parent, this.edit);
            this.edit = null;

            this.change(text, this.getId(parent));
        }

        saveState(this.state);
    }

    handleClearChecked() {
        this.state.todo = this.state.todo.filter(
            (todo) => todo.completed == false
        );
        saveState(this.state);
        this.render();
    }

    handleCheckAll() {
        const checked = this.checkAllBox.checked;
        this.state.todo.forEach((todo) => {
            todo.completed = checked;
        });
        saveState(this.state);
        this.render();
    }

    handleLinkChange(event) {
        event.preventDefault();
        const targetElement = event.target;

        this.navigate(targetElement.hash);
    }

    add() {
        const todoText = this.input.value.trim();
        if (todoText !== '') {
            const todo = { id: Date.now(), text: todoText, completed: false };
            this.state.todo.push(todo);

            this.input.value = '';
            this.checkAllBox.checked = false;

            saveState(this.state);
            this.render();
        }
    }

    change(todoText, todoId) {
        if (todoText == '') {
            this.delete(todoID);
            return;
        }
        let data = this.getTodo(todoId);

        data.text = todoText;

        saveState(this.state);
        this.render();
    }

    delete(todoId) {
        this.state.todo = this.state.todo.filter(
            (todo) => todo.id !== parseInt(todoId)
        );

        saveState(this.state);
        this.render();
    }

    updateToggle(todoId) {
        let data = this.getTodo(todoId);

        data.completed = !data.completed;
    }

    getTodo(todoId) {
        return this.state.todo.find((todo) => todo.id === parseInt(todoId));
    }

    getId(element) {
        return element.getAttribute('data-id');
    }

    render() {
        this.list.innerHTML = '';
        let data = this.state.todo;

        const numUncompleted = this.state.todo.filter(
            (todo) => todo.completed === false
        ).length;
        const word = numUncompleted == 1 ? 'item' : 'items';
        this.count.innerHTML = `<strong>${numUncompleted}</strong> ${word} left`;

        const numCompleted = this.state.todo.filter(
            (todo) => todo.completed === true
        ).length;

        if (numCompleted === data.length) {
            this.checkAllBox.checked = true;
        } else {
            this.checkAllBox.checked = false;
        }

        if (numCompleted === 0) {
            this.clear.style.display = 'none';
        } else if (numCompleted > 0) {
            this.clear.style.display = 'block';
            this.clear.innerHTML = `Clear completed`;
        }
        saveState(this.state);

        if (this.state.filter == 'active') {
            data = data.filter((obj) => obj.completed === false);
        } else if (this.state.filter == 'completed') {
            data = data.filter((obj) => obj.completed === true);
        }

        data.forEach((todo) => {
            const completed = todo.completed ? 'completed' : '';
            let check = createStructure({
                tag: 'input',
                attri: ['class', 'toggle', 'type', 'checkbox'],
            });
            let text = createStructure({
                tag: 'label',
                children: [todo.text],
            });
            let del = createStructure({
                tag: 'button',
                attri: ['class', 'destroy'],
            });

            addEvent('click', del, this.handleRemoveTodo);
            addEvent('change', check, this.handleTodoCheckBox);
            addEvent('dblclick', text, this.handleTodoTextClick);

            check.checked = completed;

            const todoElement = createStructure({
                tag: 'li',
                attri: ['data-id', todo.id, 'class', completed],
                children: [
                    createStructure({
                        tag: 'div',
                        attri: ['class', 'view'],
                        children: [check, text, del],
                    }),
                ],
            });

            this.list.appendChild(todoElement);
        });

        if (this.state.todo.length > 0) {
            document.querySelector('section.main').style.display = 'block';
            document.querySelector(
                'section.todoapp>footer.footer'
            ).style.display = 'block';
        } else {
            console.log('Hiding');
            document.querySelector('section.main').style.display = 'none';
            document.querySelector(
                'section.todoapp>footer.footer'
            ).style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    todoApp = new TodoApp();

    document.addEventListener('beforeunload', function () {
        saveState(todoApp.state);
    });
});
