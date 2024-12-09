let shoppingListArr = []
// Adding items to the container
function add(event) {
    //prevents the form from reloading before the functions executes
    event.preventDefault()
    let obj = {}
    const itemName = document.getElementById("item").value
    const price = document.getElementById("price").value

    //Checks if user entered an input in order to update the array
    if (itemName && price) {
        const obj = {
            itemName: itemName,
            price: price
        }
        shoppingListArr.push(obj)

        updatingShoppingList(itemName, price)
        const clear = document.getElementById('clear')
        clear.classList.remove('display')
    }

    //Clearing the input fields
    document.getElementById("item").value = ''
    document.getElementById("price").value = ''
}

//Function of adding elements to the shopping list class
function updatingShoppingList (itemName, price) {
    const shoppingContainer = document.querySelector('.shoppingcontainer')

        // Create a new item container
        const newItemContainer = document.createElement('div');
        newItemContainer.className = 'itemcontainer';

        // Add a close button
        const closeButton = document.createElement('i');
        closeButton.className = 'fa fa-times close';
        closeButton.setAttribute('aria-hidden', 'true');

        // Assign a function reference to onClick
        closeButton.onclick = () => removeShoppingItem (newItemContainer, itemName, price)

        // Create the left container
        const leftContainer = document.createElement('div');
        leftContainer.className = 'left';

        // Create and add the h3 and p elements
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        h3.textContent = itemName;
        p.textContent = `Ksh ${price}`;
        leftContainer.prepend(h3, p);

        // Add a checkbox
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = "complete"
        checkbox.name = 'complete';
        checkbox.value = 'completed';

        // Assign a function reference to onClick
        checkbox.onclick = () => handleCheckboxClick(checkbox, h3, p);

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' Mark as completed'));
        leftContainer.appendChild(label);

        // Assemble the new item container
        newItemContainer.appendChild(closeButton);
        newItemContainer.appendChild(leftContainer);

        return (shoppingContainer.appendChild(newItemContainer))
}

//Function to verify if the shopping item is already obtained
function handleCheckboxClick (checkbox, h3, p) {
    if (checkbox.checked){
        h3.classList.add('complete')
        p.classList.add('complete')
    } else {
        h3.classList.remove('complete')
        p.classList.remove('complete')
    }
}


//Function to remove the respective shopping item
function removeShoppingItem (newItemContainer, itemName, price) {
    // Find the item in the shoppingListArr
    const found = shoppingListArr.find(item => item.itemName === itemName && item.price === price);

    if (found) {
        // If the item is found, you can remove it from the array
        shoppingListArr = shoppingListArr.filter(item => !(item.itemName === itemName && item.price === price));
        
        // You can now remove the item container from the DOM
        newItemContainer.remove();
    }
}


function clearAll() {
    // Clear the shoppingListArr array
    shoppingListArr = [];

    // Remove all items from the DOM
    const shoppingContainer = document.querySelector('.shoppingcontainer')
    shoppingContainer.innerHTML = '' // Clears all child elements

    //Hide the clear button
    const clearButton = document.getElementById('clear');
    clearButton.classList.add('display');
}