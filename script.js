
        document.addEventListener('DOMContentLoaded', function() {
            // Elements
            const greetingOptions = document.querySelectorAll('.greeting-option');
            const customGreetingInput = document.getElementById('custom-greeting');
            const addCustomBtn = document.getElementById('add-custom');
            const userImageInput = document.getElementById('user-image');
            const userMessageInput = document.getElementById('user-message');
            const recipientNameInput = document.getElementById('recipient-name');
            const generateBtn = document.getElementById('generate-btn');
            const previewDefault = document.getElementById('preview-default');
            const previewContent = document.getElementById('preview-content');
            const previewGreeting = document.getElementById('preview-greeting');
            const previewImage = document.getElementById('preview-image');
            const previewMessage = document.getElementById('preview-message');
            const previewSignature = document.getElementById('preview-signature');
            
            let selectedGreeting = '';
            
            // Add event listeners to greeting options
            greetingOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // Remove selected class from all options
                    greetingOptions.forEach(opt => opt.classList.remove('selected'));
                    
                    // Add selected class to clicked option
                    this.classList.add('selected');
                    
                    // Set selected greeting
                    selectedGreeting = this.getAttribute('data-greeting');
                });
            });
            
            // Add custom greeting
            addCustomBtn.addEventListener('click', function() {
                const customGreeting = customGreetingInput.value.trim();
                
                if (customGreeting) {
                    // Remove selected class from all options
                    greetingOptions.forEach(opt => opt.classList.remove('selected'));
                    
                    // Create a new custom option
                    const customOption = document.createElement('div');
                    customOption.className = 'greeting-option selected';
                    customOption.setAttribute('data-greeting', customGreeting);
                    customOption.textContent = customGreeting;
                    
                    // Add event listener to the new option
                    customOption.addEventListener('click', function() {
                        greetingOptions.forEach(opt => opt.classList.remove('selected'));
                        document.querySelectorAll('.greeting-option').forEach(opt => opt.classList.remove('selected'));
                        this.classList.add('selected');
                        selectedGreeting = this.getAttribute('data-greeting');
                    });
                    
                    // Add to the options container
                    document.querySelector('.greeting-options').appendChild(customOption);
                    
                    // Select this new option
                    selectedGreeting = customGreeting;
                    
                    // Clear the input
                    customGreetingInput.value = '';
                }
            });
            
            // Generate the card
            generateBtn.addEventListener('click', function() {
                if (!selectedGreeting) {
                    alert('Please select or create a greeting type first!');
                    return;
                }
                
                // Update preview
                previewGreeting.textContent = selectedGreeting;
                previewMessage.textContent = userMessageInput.value || 'Your message will appear here';
                
                // Handle image preview
                if (userImageInput.files && userImageInput.files[0]) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        previewImage.src = e.target.result;
                    };
                    
                    reader.readAsDataURL(userImageInput.files[0]);
                } else {
                    previewImage.src = '';
                    previewImage.alt = 'No image uploaded';
                }
                
                // Add signature if name is provided
                if (recipientNameInput.value.trim()) {
                    previewSignature.textContent = `- ${recipientNameInput.value}`;
                } else {
                    previewSignature.textContent = '';
                }
                
                // Show preview content, hide default message
                previewDefault.classList.add('hidden');
                previewContent.classList.remove('hidden');
            });
            
            // Allow pressing Enter to add custom greeting
            customGreetingInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addCustomBtn.click();
                }
            });
        });
    

        // DOWNLOAD CARD

const downloadBtn = document.getElementById("download-btn");

downloadBtn.addEventListener("click", async () => {

    // Select preview card
    const card = document.querySelector(".preview-card");

    // Change button text while generating
    downloadBtn.innerText = "Generating...";

    try {

        // Convert card to canvas
        const canvas = await html2canvas(card, {
            scale: 4,
            useCORS: true,
            backgroundColor: null
        });

        // Convert canvas to image
        const image = canvas.toDataURL("image/png");

        // Create temporary download link
        const link = document.createElement("a");

        link.href = image;

        link.download = "greeting-card.png";

        // Trigger download
        link.click();

    } catch(error) {

        console.log("Download Failed:", error);

    }

    // Restore button text
    downloadBtn.innerText = "Download Card";

});