document.addEventListener('DOMContentLoaded', () => {
  const formContainer = document.getElementById('form-container');
  const exampleSection = document.getElementById('example-section');
  const exampleTitle = document.getElementById('example-title');
  const exampleContent = document.getElementById('example-content');
  const buttons = document.querySelectorAll('.buttons button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const scriptType = button.getAttribute('data-script');
      loadForm(scriptType);
      loadExample(scriptType);
    });
  });

  function loadForm(scriptType) {
    // Aquí se deben cargar los campos del formulario según el tipo de script
    let formHtml = '';
    switch (scriptType) {
      case 'terraform':
        formHtml = `<h2>Formulario Terraform</h2>
          <form id="terraform-form">
            <!-- Campos del formulario para Terraform -->
          </form>`;
        break;
      case 'arm':
        formHtml = `<h2>Formulario ARM</h2>
          <form id="arm-form">
            <!-- Campos del formulario para ARM -->
          </form>`;
        break;
      case 'powershell-avs':
        formHtml = `<h2>Formulario PowerShell AVS</h2>
          <form id="powershell-avs-form">
            <!-- Campos del formulario para PowerShell AVS -->
          </form>`;
        break;
      case 'powershell':
        formHtml = `<h2>Formulario PowerShell</h2>
          <form id="powershell-form">
            <!-- Campos del formulario para PowerShell -->
          </form>`;
        break;
    }
    formContainer.innerHTML = formHtml;
  }

  function loadExample(scriptType) {
    // Aquí se deben cargar los ejemplos de ejecución según el tipo de script
    let exampleTitleText = '';
    let exampleContentText = '';
    switch (scriptType) {
      case 'terraform':
        exampleTitleText = 'Ejemplo de Ejecución de Terraform';
        exampleContentText = 'Aquí va el ejemplo de Terraform...';
        break;
      case 'arm':
        exampleTitleText = 'Ejemplo de Ejecución de ARM';
        exampleContentText = 'Aquí va el ejemplo de ARM...';
        break;
      case 'powershell-avs':
        exampleTitleText = 'Ejemplo de Ejecución de PowerShell AVS';
        exampleContentText = 'Aquí va el ejemplo de PowerShell AVS...';
        break;
      case 'powershell':
        exampleTitleText = 'Ejemplo de Ejecución de PowerShell';
        exampleContentText = 'Aquí va el ejemplo de PowerShell...';
        break;
    }
    exampleTitle.textContent = exampleTitleText;
    exampleContent.textContent = exampleContentText;
    exampleSection.classList.remove('hidden');
  }

  function loadProperties(scriptType) {
  fetch(`${scriptType}.properties`)
    .then(response => response.text())
    .then(data => {
      const properties = data.split('\n').reduce((acc, line) => {
        const [key, value] = line.split('=');
        if (key && value) acc[key.trim()] = value.trim();
        return acc;
      }, {});

      populateForm(properties);
    });
}

function populateForm(properties) {
  // Supón que tienes elementos en el formulario con IDs específicos
  document.getElementById('provider').value = properties.provider || '';
  document.getElementById('resource_group_name').value = properties.resource_group_name || '';
  document.getElementById('location').value = properties.location || '';
  document.getElementById('vm_size').value = properties.vm_size || '';
  document.getElementById('admin_username').value = properties.admin_username || '';
  document.getElementById('admin_password').value = properties.admin_password || '';
  document.getElementById('network_interface_name').value = properties.network_interface_name || '';
  document.getElementById('storage_account_name').value = properties.storage_account_name || '';
  // Añadir otros campos según sea necesario
}

});
