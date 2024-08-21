function showScriptForm(scriptType) {
  const scriptTitle = document.getElementById('scriptTitle');
  const dynamicForm = document.getElementById('dynamicForm');
  const exampleSection = document.getElementById('exampleSection');
  const generateButton = document.getElementById('generateButton');

  scriptTitle.textContent = `Script para ${capitalize(scriptType)}`;
  dynamicForm.innerHTML = getFormHtml(scriptType);
  exampleSection.innerHTML = getExampleHtml(scriptType);
  exampleSection.classList.remove('hidden');

  generateButton.onclick = () => generateScript(scriptType);
  loadProperties(scriptType);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getFormHtml(scriptType) {
  switch (scriptType) {
    case 'terraform':
      return `
        <div>
          <label for="provider">Proveedor:</label>
          <input type="text" id="provider" name="provider">
        </div>
        <div>
          <label for="resource_group_name">Nombre del Grupo de Recursos:</label>
          <input type="text" id="resource_group_name" name="resource_group_name">
        </div>
        <div>
          <label for="location">Ubicación:</label>
          <input type="text" id="location" name="location">
        </div>
        <div>
          <label for="vm_size">Tamaño de VM:</label>
          <input type="text" id="vm_size" name="vm_size">
        </div>
        <div>
          <label for="admin_username">Nombre de Usuario Admin:</label>
          <input type="text" id="admin_username" name="admin_username">
        </div>
        <div>
          <label for="admin_password">Contraseña Admin:</label>
          <input type="password" id="admin_password" name="admin_password">
        </div>
        <div>
          <label for="network_interface_name">Nombre de la Interfaz de Red:</label>
          <input type="text" id="network_interface_name" name="network_interface_name">
        </div>
        <div>
          <label for="storage_account_name">Nombre de la Cuenta de Almacenamiento:</label>
          <input type="text" id="storage_account_name" name="storage_account_name">
        </div>
        <div class="table-responsive">
          <table id="terraform-table" class="dynamic-table">
            <thead>
              <tr>
                <th>Nombre del Servidor</th>
                <th>Sistema Operativo</th>
                <th>Almacenamiento (GB)</th>
                <th>Memoria RAM (GB)</th>
                <th>Cantidad de Núcleos</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      `;
    case 'arm':
      return `
        <div>
          <label for="location">Ubicación:</label>
          <input type="text" id="location" name="location">
        </div>
        <div>
          <label for="vm_size">Tamaño de VM:</label>
          <input type="text" id="vm_size" name="vm_size">
        </div>
        <div>
          <label for="admin_username">Nombre de Usuario Admin:</label>
          <input type="text" id="admin_username" name="admin_username">
        </div>
        <div>
          <label for="admin_password">Contraseña Admin:</label>
          <input type="password" id="admin_password" name="admin_password">
        </div>
        <div>
          <label for="network_interface_id">ID de Interfaz de Red:</label>
          <input type="text" id="network_interface_id" name="network_interface_id">
        </div>
        <div class="table-responsive">
          <table id="arm-table" class="dynamic-table">
            <thead>
              <tr>
                <th>Nombre del Servidor</th>
                <th>Sistema Operativo</th>
                <th>Almacenamiento (GB)</th>
                <th>Memoria RAM (GB)</th>
                <th>Cantidad de Núcleos</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      `;
    case 'powershell-avs':
      return `
        <div>
          <label for="resource_group_name">Nombre del Grupo de Recursos:</label>
          <input type="text" id="resource_group_name" name="resource_group_name">
        </div>
        <div>
          <label for="location">Ubicación:</label>
          <input type="text" id="location" name="location">
        </div>
        <div>
          <label for="vm_size">Tamaño de VM:</label>
          <input type="text" id="vm_size" name="vm_size">
        </div>
        <div>
          <label for="admin_username">Nombre de Usuario Admin:</label>
          <input type="text" id="admin_username" name="admin_username">
        </div>
        <div>
          <label for="admin_password">Contraseña Admin:</label>
          <input type="password" id="admin_password" name="admin_password">
        </div>
        <div>
          <label for="network_interface_id">ID de Interfaz de Red:</label>
          <input type="text" id="network_interface_id" name="network_interface_id">
        </div>
        <div>
          <label for="avd_pool_name">Nombre del Pool de AVD:</label>
          <input type="text" id="avd_pool_name" name="avd_pool_name">
        </div>
        <div class="table-responsive">
          <table id="powershell-avs-table" class="dynamic-table">
            <thead>
              <tr>
                <th>Nombre del Servidor</th>
                <th>Sistema Operativo</th>
                <th>Almacenamiento (GB)</th>
                <th>Memoria RAM (GB)</th>
                <th>Cantidad de Núcleos</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      `;
    case 'powershell':
      return `
        <div>
          <label for="resource_group_name">Nombre del Grupo de Recursos:</label>
          <input type="text" id="resource_group_name" name="resource_group_name">
        </div>
        <div>
          <label for="location">Ubicación:</label>
          <input type="text" id="location" name="location">
        </div>
        <div>
          <label for="vm_size">Tamaño de VM:</label>
          <input type="text" id="vm_size" name="vm_size">
        </div>
        <div>
          <label for="admin_username">Nombre de Usuario Admin:</label>
          <input type="text" id="admin_username" name="admin_username">
        </div>
        <div>
          <label for="admin_password">Contraseña Admin:</label>
          <input type="password" id="admin_password" name="admin_password">
        </div>
        <div>
          <label for="network_interface_id">ID de Interfaz de Red:</label>
          <input type="text" id="network_interface_id" name="network_interface_id">
        </div>
        <div class="table-responsive">
          <table id="powershell-table" class="dynamic-table">
            <thead>
              <tr>
                <th>Nombre del Servidor</th>
                <th>Sistema Operativo</th>
                <th>Almacenamiento (GB)</th>
                <th>Memoria RAM (GB)</th>
                <th>Cantidad de Núcleos</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      `;
    default:
      return '';
  }
}

function getExampleHtml(scriptType) {
  switch (scriptType) {
    case 'terraform':
      return `
        <h3>Ejemplo de Script Terraform</h3>
        <pre>
provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "example" {
  name     = "${document.getElementById('resource_group_name').value}"
  location = "${document.getElementById('location').value}"
}

resource "azurerm_virtual_network" "example" {
  name                = "example-network"
  address_space        = ["10.0.0.0/16"]
  location            = "${document.getElementById('location').value}"
  resource_group_name = "${document.getElementById('resource_group_name').value}"
}
        </pre>
      `;
    case 'arm':
      return `
        <h3>Ejemplo de Script ARM</h3>
        <pre>
{
  "$schema": "https://schema.management.azure.com/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "resources": [
    {
      "type": "Microsoft.Compute/virtualMachines",
      "apiVersion": "2019-07-01",
      "name": "myVM",
      "location": "${document.getElementById('location').value}",
      "properties": {
        "hardwareProfile": {
          "vmSize": "${document.getElementById('vm_size').value}"
        }
      }
    }
  ]
}
        </pre>
      `;
    case 'powershell-avs':
      return `
        <h3>Ejemplo de Script PowerShell AVS</h3>
        <pre>
$resourceGroupName = "${document.getElementById('resource_group_name').value}"
$location = "${document.getElementById('location').value}"
$vmSize = "${document.getElementById('vm_size').value}"
$adminUsername = "${document.getElementById('admin_username').value}"
$adminPassword = ConvertTo-SecureString "${document.getElementById('admin_password').value}" -AsPlainText -Force
$networkInterfaceId = "${document.getElementById('network_interface_id').value}"
$avdPoolName = "${document.getElementById('avd_pool_name').value}"

# Crear una máquina virtual
New-AzVM -ResourceGroupName $resourceGroupName -Location $location -VMSize $vmSize -Credential (New-Object PSCredential($adminUsername, $adminPassword)) -NetworkInterfaceId $networkInterfaceId -Name "MyVM" -AvailabilitySetId "/subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP_NAME>/providers/Microsoft.Compute/availabilitySets/$avdPoolName"
        </pre>
      `;
    case 'powershell':
      return `
        <h3>Ejemplo de Script PowerShell</h3>
        <pre>
$resourceGroupName = "${document.getElementById('resource_group_name').value}"
$location = "${document.getElementById('location').value}"
$vmSize = "${document.getElementById('vm_size').value}"
$adminUsername = "${document.getElementById('admin_username').value}"
$adminPassword = ConvertTo-SecureString "${document.getElementById('admin_password').value}" -AsPlainText -Force
$networkInterfaceId = "${document.getElementById('network_interface_id').value}"

# Crear una máquina virtual
New-AzVM -ResourceGroupName $resourceGroupName -Location $location -VMSize $vmSize -Credential (New-Object PSCredential($adminUsername, $adminPassword)) -NetworkInterfaceId $networkInterfaceId -Name "MyVM"
        </pre>
      `;
    default:
      return '';
  }
}

function generateScript(scriptType) {
  // Aquí puedes implementar la lógica para generar el script según el tipo seleccionado
  alert(`Generando script para ${capitalize(scriptType)}`);
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
  document.getElementById('provider').value = properties.provider || '';
  document.getElementById('resource_group_name').value = properties.resource_group_name || '';
  document.getElementById('location').value = properties.location || '';
  document.getElementById('vm_size').value = properties.vm_size || '';
  document.getElementById('admin_username').value = properties.admin_username || '';
  document.getElementById('admin_password').value = properties.admin_password || '';
  document.getElementById('network_interface_name').value = properties.network_interface_name || '';
  document.getElementById('storage_account_name').value = properties.storage_account_name || '';
  document.getElementById('network_interface_id').value = properties.network_interface_id || '';
  document.getElementById('avd_pool_name').value = properties.avd_pool_name || '';
}
