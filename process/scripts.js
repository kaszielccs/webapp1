document.addEventListener('DOMContentLoaded', () => {
  const generateTerraform = document.getElementById('generate-terraform');
  const generateArm = document.getElementById('generate-arm');
  const generatePowershellAvs = document.getElementById('generate-powershell-avs');
  const generatePowershell = document.getElementById('generate-powershell');
  const scriptFormSection = document.getElementById('script-form-section');
  const scriptTitle = document.getElementById('script-title');
  const exampleSection = document.getElementById('example-section');
  const exampleCode = document.getElementById('example-code');
  const generateButtons = document.getElementById('script-buttons');
  const downloadSection = document.getElementById('download-section');
  const downloadLink = document.getElementById('download-link');
  const scriptModal = document.getElementById('script-modal');
  const modalScriptContent = document.getElementById('modal-script-content');
  const closeModal = document.getElementById('close-modal');
  const serverFieldsContainer = document.getElementById('server-fields');

  function updateFormAndExample(scriptType) {
    scriptTitle.textContent = `Script para ${scriptType}`;
    exampleCode.textContent = getExampleCode(scriptType);
    exampleSection.classList.remove('hidden');
    generateButtons.classList.remove('hidden');
    serverFieldsContainer.innerHTML = getServerFieldsHtml();
  }

  function getExampleCode(scriptType) {
    switch (scriptType) {
      case 'Terraform':
        return 'Ejemplo de Terraform...'; // Replace with actual example
      case 'ARM':
        return 'Ejemplo de ARM...'; // Replace with actual example
      case 'PowerShell AVS':
        return 'Ejemplo de PowerShell AVS...'; // Replace with actual example
      case 'PowerShell':
        return 'Ejemplo de PowerShell...'; // Replace with actual example
      default:
        return '';
    }
  }

  function getServerFieldsHtml() {
    return `
      <div class="table-responsive">
        <table class="dynamic-table">
          <thead>
            <tr>
              <th>Nombre del Servidor</th>
              <th>Sistema Operativo</th>
              <th>Almacenamiento (GB)</th>
              <th>Memoria RAM (GB)</th>
              <th>Cantidad de Núcleos</th>
            </tr>
          </thead>
          <tbody id="server-fields-body">
            <!-- Dynamically added rows go here -->
          </tbody>
        </table>
      </div>
    `;
  }

  function generateScript(scriptType) {
    // Logic to generate script based on selected type
    const vmCount = parseInt(document.getElementById('vm-count').value, 10) || 0;
    const additionalSoftware = document.getElementById('additional-software').value;
    const serverConfigs = []; // Gather server configurations from form inputs

    const scriptContent = createScript(scriptType, vmCount, serverConfigs, additionalSoftware);
    modalScriptContent.textContent = scriptContent;
    downloadLink.href = `data:application/json;charset=utf-8,${encodeURIComponent(scriptContent)}`;
    downloadLink.download = `script-${scriptType.toLowerCase()}.json`;
    downloadSection.classList.remove('hidden');
    scriptModal.classList.remove('hidden');
  }

  function createScript(scriptType, vmCount, serverConfigs, additionalSoftware) {
    // Create script content based on scriptType
    return `Generated ${scriptType} script content...`; // Replace with actual content generation
  }

  generateTerraform.addEventListener('click', () => {
    updateFormAndExample('Terraform');
    generateScript('Terraform');
  });
  
  generateArm.addEventListener('click', () => {
    updateFormAndExample('ARM');
    generateScript('ARM');
  });
  
  generatePowershellAvs.addEventListener('click', () => {
    updateFormAndExample('PowerShell AVS');
    generateScript('PowerShell AVS');
  });
  
  generatePowershell.addEventListener('click', () => {
    updateFormAndExample('PowerShell');
    generateScript('PowerShell');
  });

  closeModal.addEventListener('click', () => {
    scriptModal.classList.add('hidden');
  });
});
