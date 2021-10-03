class WhatsAppController{
    constructor()
    {
        console.log("Whatsapp controller funcional");


        this.loadElements();
        this.elementsPrototypes();
        this.initEvents();
    }

    loadElements()
    {
        this.el = {};
        document.querySelectorAll('[id]').forEach(element =>{
            this.el[Format.getCamelCase(element.id)] = element;
        });
    }

    elementsPrototypes(){
        Element.prototype.hide = function(){
            this.style.display = 'none';
            return this;
        }

        Element.prototype.show = function(){
            this.style.display = 'block';
            return this;
        }

        Element.prototype.toggle = function(){
            this.style.display = ((this.style.display == 'none') ? 'block' : 'none');
            return this;
        }


        Element.prototype.on = function(events, callbackFunction)
        {
            events.split(' ').forEach(event =>{
                this.addEventListener(event, callbackFunction);
            });
            return this;
        }

        Element.prototype.css = function(styles){
            for (let name in styles)
            {
                this.style[name] = styles[name];
            }
            return this;
        }

        Element.prototype.addClass = function(style){
            this.classList.add(style);
            return this;
        }

        Element.prototype.removeClass = function(style){
            this.classList.remove(style);
            return this;
        }
        Element.prototype.toggleClass = function(style){
            this.classList.toggle(style);
            return this;
        }

        Element.prototype.toggleClass = function(style){
            return this.classList.contains(style);
        }

        HTMLFormElement.prototype.getForm = function(){
            return new FormData(this)
        }

        HTMLFormElement.prototype.toJSON = function(){
            
            let json = {};
            
            this.getForm().forEach((element, key) =>{
                json[key] = element;
            });

            return json;
        }

        
    }

    initEvents()
    {
        this.el.myPhoto.on('click', e =>{
            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();

            setTimeout(() =>{
                this.el.panelEditProfile.addClass('open');
            }, 300)
        });

        this.el.btnNewContact.on('click', e=>{
            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(() =>{
                this.el.panelAddContact.addClass('open');
            }, 300)
        }); 

        this.el.btnClosePanelEditProfile.on('click', e=>{
            this.el.panelEditProfile.removeClass('open');
        });

        this.el.btnClosePanelAddContact.on('click', e=>{
            this.el.panelAddContact.removeClass('open');
        });

        this.el.photoContainerEditProfile.on('click', ()=>{
            this.el.inputProfilePhoto.click();
        });

        this.el.inputNamePanelEditProfile.on('keypress', e=>{
            
            if(e.key === "Enter")
            {
                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }
        });

        this.el.btnSavePanelEditProfile.on('click', e=>{
            console.log(this.el.inputNamePanelEditProfile.innerHTML);
        });

        this.el.formPanelAddContact.on('submit', e=>{
            e.preventDefault();

            let formData = new FormData(this.el.formPanelAddContact);
            console.log(formData);
        });
        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(element =>{
            element.on('click', (e) =>{
                this.el.home.hide();
                this.el.main.css({
                    display: 'flex'
                })
            });
        });

        this.el.btnAttach.on('click', (e)=>{

            e.stopPropagation();
            this.el.menuAttach.addClass('open');
            
            document.addEventListener('click',  this.closeMenuAttach.bind(this));
        });

        this.el.btnAttachCamera.on('click', e=>{
            this.closeAllMainPanel();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                'height': 'calc(100% - 120px)'
            });

            
        });

        this.el.btnAttachPhoto.on('click', e=>{
            this.el.inputPhoto.click();
        });


        this.el.btnClosePanelCamera.on('click', (e)=>{
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();
        });

        this.el.inputPhoto.on('change', e=>{
            [...this.el.inputPhoto.files].forEach((element, index, array) =>{
                console.log(element);
            });
        });

        this.el.btnTakePicture.on('click', e=>{
            console.log('picture');
        });

        this.el.btnAttachDocument.on('click', e=>{
            this.closeAllMainPanel();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                'height': 'calc(100% - 120px)'
            });


        });

        this.el.btnClosePanelDocumentPreview.on('click', e=>{
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });

        this.el.btnSendDocument.on('click', e=>{
            console.log("Send document");
        });

        this.el.btnAttachContact.on('click', e=>{
            this.el.modalContacts.show();


        });


        this.el.btnCloseModalContacts.on('click', e=>{
            this.el.modalContacts.hide();
        });

        this.el.btnSendMicrophone.on('click', ()=>{

            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();

            this.startRecordMicrophoneTime();
        });

        this.el.btnCancelMicrophone.on('click', e=>{

            this.closeRecordMicrophone();
        });

        this.el.btnFinishMicrophone.on('click', e=>{
            this.closeRecordMicrophone();
        });

        this.el.inputText.on('keypress', e=>{
            if(e.key == 'Enter' && !e.ctrlKey)
            {
                e.preventDefault();
                this.el.btnSend.click();
            }
        });
        this.el.inputText.on('keyup', e=>{
            if(this.el.inputText.innerHTML.length)
            {

                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();
            }
            else
            {
                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
            }
        });


        this.el.btnSend.on('click', e=>{
            console.log(this.el.inputText.innerHTML);
        });

        this.el.btnEmojis.on('click', e=>{
            this.el.panelEmojis.addClass('open');
        });

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji =>{
            emoji.on('click', e=>{
                
            });
        });
        
    }

    startRecordMicrophoneTime()
    {
        let start = Date.now();

        this.recordMicrophoneInterval = setInterval(() => {
            this.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start);
        }, 100);
    }
    closeRecordMicrophone()
    {
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();

        clearInterval(this.recordMicrophoneInterval);
    }

    closeAllMainPanel()
    {
        this.el.panelMessagesContainer.hide();
        this.el.panelCamera.removeClass('open');
        this.el.panelDocumentPreview.removeClass('open');


    }
    closeMenuAttach(event)
    {
        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');

    }
    closeAllLeftPanel()
    {
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }
}