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
    }

    closeAllLeftPanel()
    {
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }
}