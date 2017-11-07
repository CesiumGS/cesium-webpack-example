var defaultAction;
    var bucket = window.location.href;
    var pos = bucket.lastIndexOf('/');
    if (pos > 0 && pos < (bucket.length - 1)) {
        bucket = bucket.substring(pos + 1);
    }

module.exports = {
        bucket : bucket,
        registered : [],
        finishedLoading : function() {
            if(defaultAction) {
                defaultAction();
                defaultAction = undefined;
            }

            document.body.className = document.body.className.replace(/(?:\s|^)sandcastle-loading(?:\s|$)/, ' ');
        },
        addToggleButton : function(text, checked, onchange, toolbarID) {
            var input = document.createElement('input');
            input.checked = checked;
            input.type = 'checkbox';
            input.style.pointerEvents = 'none';
            var label = document.createElement('label');
            label.appendChild(input);
            label.appendChild(document.createTextNode(text));
            label.style.pointerEvents = 'none';
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'cesium-button';
            button.appendChild(label);

            button.onclick = function() {
                input.checked = !input.checked;
                onchange(input.checked);
            };

            document.getElementById(toolbarID || 'toolbar').appendChild(button);
        },
        addToolbarButton : function(text, onclick, toolbarID) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'cesium-button';
            button.onclick = function() {
                onclick();
            };
            button.textContent = text;
            document.getElementById(toolbarID || 'toolbar').appendChild(button);
        },
        addDefaultToolbarButton : function(text, onclick, toolbarID) {
            this.addToolbarButton(text, onclick, toolbarID);
            defaultAction = onclick;
        },
        addDefaultToolbarMenu : function(options, toolbarID) {
            this.addToolbarMenu(options, toolbarID);
            defaultAction = options[0].onselect;
        },
        addToolbarMenu : function(options, toolbarID) {
            var menu = document.createElement('select');
            menu.className = 'cesium-button';
            menu.onchange = function() {
                var item = options[menu.selectedIndex];
                if (item && typeof item.onselect === 'function') {
                    item.onselect();
                }
            };
            document.getElementById(toolbarID || 'toolbar').appendChild(menu);

            if (!defaultAction && typeof options[0].onselect === 'function') {
                defaultAction = options[0].onselect;
            }

            for (var i = 0, len = options.length; i < len; ++i) {
                var option = document.createElement('option');
                option.textContent = options[i].text;
                option.value = options[i].value;
                menu.appendChild(option);
            }
        }
    };