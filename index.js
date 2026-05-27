let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector('.to-do__list');
const formElement = document.querySelector('.to-do__form');
const inputElement = document.querySelector('.to-do__input');

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        return JSON.parse(savedTasks);
    }
    return items;
}

function createItem(item) {
    const template = document.getElementById('to-do__item-template').content;
    const clone = template.querySelector('.to-do__item').cloneNode(true);
    const textElement = clone.querySelector('.to-do__item-text');
    const editButton = clone.querySelector('.to-do__item-button_type_edit');
    const duplicateButton = clone.querySelector('.to-do__item-button_type_duplicate');
    const deleteButton = clone.querySelector('.to-do__item-button_type_delete');

    deleteButton.addEventListener('click', () => {
        clone.remove();
        let items = getTasksFromDOM();
        saveTasks(items);
    });

    duplicateButton.addEventListener('click', () => {
        let itemName = textElement.textContent;
        let newItem = createItem(itemName);

        listElement.prepend(newItem);
        let items = getTasksFromDOM();
        saveTasks(items);
    });

    editButton.addEventListener('click', () => {
        textElement.setAttribute("contenteditable", "true");
        textElement.focus();
    });

    textElement.addEventListener("blur", () => {
        textElement.setAttribute("contenteditable", "false");
        let tasks = getTasksFromDOM();
        saveTasks(tasks);
    });

    textElement.textContent = item;

    return clone;

}

function getTasksFromDOM() {
    const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
    let tasks = [];
    itemsNamesElements.forEach((el) => {
        tasks.push(el.textContent);
    });
    return tasks;
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const element = createItem(inputElement.value);
    listElement.prepend(element);

    items = getTasksFromDOM();
    saveTasks(items);
    formElement.reset();
});

items = loadTasks();
items.forEach((a) => {
    listElement.append(createItem(a));
});