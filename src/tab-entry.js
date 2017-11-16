import invariant from 'invariant';

export class TabEntry {
    constructor(label, path, Component) {
        this.label = label;
        this.path = path;
        this.Component = Component;
    }
}

export default ({label, path, Component}) => {
    invariant(label, "A label is required to create a tab router entry");
    invariant(path, "A path is required to create a tab router entry");
    invariant(Component, "A Component is required to create a tab router entry");

    return new TabEntry(label, path, Component);
}
