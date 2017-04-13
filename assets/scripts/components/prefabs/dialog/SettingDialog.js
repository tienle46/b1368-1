import app from 'app';
import DialogActor from 'DialogActor';

class SettingDialog extends DialogActor {
    constructor() {
        super();
        this.properties = {
            ...this.properties,
            bgTransparent: cc.Node,
            soundOptions: cc.Toggle,
            invitationOptions: cc.Toggle,
        }
    }

    onLoad() {
        super.onLoad();
        // this._initComponents();
        this.bgTransparent.on('touchstart', function() {
            return;
        });
        
        this._initState();
    }

    onDestroy() {
        super.onDestroy();
        // this._removeGlobalListeners();
    }
    
    onSoundToggleClick(toggle) {
        app.system.marker.setItem(app.system.marker.SOUND_OPTION, toggle.isChecked)
    }
    
    onInvitationToggleClick(toggle) {
        app.system.marker.setItem(app.system.marker.SHOW_INVITATION_POPUP_OPTION, toggle.isChecked)
    }
    
    start() {
        super.start();
    }

    _addGlobalListener() {
        super._addGlobalListener();
    }

    _removeGlobalListener() {
        super._removeGlobalListener();
    }
    
    _initState() {
        this.soundOptions.isChecked = (app.system.marker.getItemData(app.system.marker.SOUND_OPTION) == 'true') || false;
        this.invitationOptions.isChecked = (app.system.marker.getItemData(app.system.marker.SHOW_INVITATION_POPUP_OPTION) == 'true') || false;
    }
    
    close() {
        this.node.destroy();
    }
}

app.createComponent(SettingDialog);