import {ActionState, ContextMenuManager, ContextMenuTypes, EntityType, Plugin} from "@highlite/plugin-api";

export default class LookupPlugin extends Plugin {
    pluginName = "Wiki Lookup";
    author: string = "Highlite";

    private contextMenuManager: ContextMenuManager = new ContextMenuManager();

    constructor() {
        super()
    };

    init(): void {
        this.log("Wiki Lookup Plugin initializing");
    }

    start(): void {
        this.log("Wiki Lookup Plugin started");
        this.contextMenuManager.AddInventoryItemMenuAction('Lookup', this.handleInventoryLookup, ActionState.Any, ContextMenuTypes.Any);
        this.contextMenuManager.AddGameWorldMenuAction('Lookup', this.handlePlayerLookup, EntityType.Player);
        this.contextMenuManager.AddGameWorldMenuAction('Lookup', this.handleWorldObjectLookup, EntityType.WorldObject);
        this.contextMenuManager.AddGameWorldMenuAction('Lookup', this.handleWorldObjectLookup, EntityType.NPC);
        this.contextMenuManager.AddGameWorldMenuAction('Lookup', this.handleWorldObjectLookup, EntityType.GroundItem);
    }

    stop(): void {
        this.log("Wiki Lookup Plugin stopped");
        this.contextMenuManager.RemoveInventoryItemMenuAction('Lookup', this.handleInventoryLookup, ActionState.Any, ContextMenuTypes.Any);
        this.contextMenuManager.RemoveGameWorldMenuAction('Lookup', this.handlePlayerLookup, EntityType.Player);
        this.contextMenuManager.RemoveGameWorldMenuAction('Lookup', this.handleWorldObjectLookup, EntityType.WorldObject);
        this.contextMenuManager.RemoveGameWorldMenuAction('Lookup', this.handleWorldObjectLookup, EntityType.NPC);
        this.contextMenuManager.RemoveGameWorldMenuAction('Lookup', this.handleWorldObjectLookup, EntityType.GroundItem);
    }

    handleInventoryLookup(actionInfo: any, clickInfo: any): void {
        const item = actionInfo.getItem();
        window.open(
            `https://highspell.wiki/w/${item.Def._nameCapitalized.replace(' ', '_')}`
        );
    }

    handlePlayerLookup(actionInfo: any, clickInfo: any): void {
        const player = actionInfo.getEntity();
        const playerName = player._name;
        window.open(`https://highspell.com/hiscores/player/${playerName}`);
    }

    handleWorldObjectLookup(actionInfo: any, clickInfo: any): void {
        const object = actionInfo.getEntity();
        const objectName = object._name;
        window.open(`https://highspell.wiki/w/${objectName.replace(' ', '_')}`);
    }
}
