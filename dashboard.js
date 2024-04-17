document.addEventListener('DOMContentLoaded', function () {
    // Retrieve form data array from local storage
const formDataArray = JSON.parse(localStorage.getItem('formDataArray'));

// Display form data on the dashboard
const userDataElement = document.getElementById('userData');

// Create a table element
const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');

// Check if there are form submissions in the array
if (formDataArray && formDataArray.length > 0) {

    const headerRow = document.createElement('tr');

    // Get keys (column names) from the first form submission
    const keys = Object.keys(formDataArray[0]);

    // Loop through keys to create table headers
    keys.forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });

    // Create header for update and delete buttons
    const updateTh = document.createElement('th');
    updateTh.textContent = 'Update';
    headerRow.appendChild(updateTh);

    const deleteTh = document.createElement('th');
    deleteTh.textContent = 'Delete';
    headerRow.appendChild(deleteTh);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Loop through each form submission object in the array
    formDataArray.forEach((formData, index) => {
        // Create a new row for each form submission
        const row = document.createElement('tr');

        // Loop through each key in the keys array
        keys.forEach(key => {
            const td = document.createElement('td');
            td.textContent = formData[key];
            row.appendChild(td);
        });

        // Create update button for each row
        const updateIcon = document.createElement('i');
        updateIcon.classList.add('fa', 'fa-edit');
        updateIcon.style.fontSize = '24px';
        updateIcon.style.color = 'blue';
        updateIcon.style.cursor = 'pointer';
        updateIcon.addEventListener('click', () => {
            keys.forEach(key => {
                const value = formData[key];
                const input = document.createElement('input');
                input.value = value;
                const td = row.querySelector(`td:nth-child(${keys.indexOf(key) + 1})`);
                td.textContent = '';
                td.appendChild(input);
            });

            // Create confirmation button (checkmark icon)
            const confirmIcon = document.createElement('i');
            confirmIcon.classList.add('fa', 'fa-check');
            confirmIcon.style.fontSize = '24px';
            confirmIcon.style.color = 'green';
            confirmIcon.style.cursor = 'pointer';
            confirmIcon.addEventListener('click', () => {
                keys.forEach((key, idx) => {
                    const newValue = row.childNodes[idx].firstChild.value;
                    formData[key] = newValue;
                    row.childNodes[idx].textContent = newValue;
                });

                // Remove the icons
                row.removeChild(confirmIcon);
                row.removeChild(cancelIcon);

                // Update local storage
                localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
            });
            row.appendChild(confirmIcon);

            // Create cancel button (cross icon)
            const cancelIcon = document.createElement('i');
            cancelIcon.classList.add('fa', 'fa-times');
            cancelIcon.style.fontSize = '24px';
            cancelIcon.style.color = 'red';
            cancelIcon.style.cursor = 'pointer';
            cancelIcon.addEventListener('click', () => {
                // Refresh the table without making any changes
                location.reload();
            });
            row.appendChild(cancelIcon);
        });

        // Create delete button for each row
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa', 'fa-trash-o');
        deleteIcon.style.fontSize = '24px';
        deleteIcon.style.color = 'red';
        deleteIcon.style.cursor = 'pointer';
        deleteIcon.addEventListener('click', () => {
            // Remove the row from the table
            tbody.removeChild(row);
            // Remove the form data from the array
            formDataArray.splice(index, 1);
            // Update local storage
            localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
        });

        // Append update and delete icons to the row
        const updateTd = document.createElement('td');
        updateTd.appendChild(updateIcon);
        row.appendChild(updateTd);

        const deleteTd = document.createElement('td');
        deleteTd.appendChild(deleteIcon);
        row.appendChild(deleteTd);

        // Append the row to the table body
        tbody.appendChild(row);
    });

    // Append the table body to the table
    table.appendChild(tbody);
} else {
    // If there are no form submissions, display a message
    userDataElement.textContent = "No form submissions yet.";
}

// Append the table to the userDataElement
userDataElement.appendChild(table);

});
