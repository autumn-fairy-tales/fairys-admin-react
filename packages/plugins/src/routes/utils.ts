class TreeDir {
  /**目录*/
  public dir: string = '';
  /**子目录*/
  public children: TreeDir[] = [];

  /**添加子目录*/
  addChild(dir: string) {
    const listDirs = dir.split('/');
    const [first, ...rest] = listDirs;
    if (!first) {
      return;
    }
    const child = this.children.find((item) => item.dir === first);
    if (child) {
      child.addChild(rest.join('/'));
    } else {
      const newChild = new TreeDir();
      newChild.dir = first;
      this.children.push(newChild);
      newChild.addChild(rest.join('/'));
    }
  }
}
