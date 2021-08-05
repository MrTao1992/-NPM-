/**
* 截屏模块
*/
export class ShotUtil {

    /**当前的渲染图 */
    private static texture: cc.RenderTexture;
    /**截屏的摄像机 */
    private static camera: cc.Camera;
    /**当前场景元素 */
    private static _canvas: HTMLCanvasElement;

    /**开始截图并返回截图的 cc.SpriteFrame 
     * @param camera 用来截屏的摄像机，可选，为空时会自动创建一个截全屏的摄像机  
     */
    public static async screenShot(camera?: cc.Camera): Promise<cc.SpriteFrame> {
        if (camera) {
            this.camera = camera;
        } else {//创建摄像机节点
            let node = new cc.Node();
            node.parent = cc.director.getScene().children[0];
            this.camera = node.addComponent(cc.Camera);
        }
        this.init();
        this.createCanvas();
        let sf = await this.getSpriteFrame();
        if (!camera) {
            this.camera.node.destroy();
        }
        return <any>sf;
    }


    private static init() {
        let texture = new cc.RenderTexture();
        texture.initWithSize(cc.winSize.width, cc.winSize.height, cc["gfx"].RB_FMT_S8);
        this.camera.targetTexture = texture;
        this.texture = texture;
    }

    /**创建Canvas和Context，填充图像数据 */
    private static createCanvas() {
        let width = this.texture.width;
        let height = this.texture.height;
        if (!this._canvas) {
            this._canvas = document.createElement("canvas");
            this._canvas.width = width;
            this._canvas.height = height;
        } else {
            let ctx = this._canvas.getContext("2d");
            ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
        //手动渲染摄像机，获得当前场景截图数据
        this.camera.render(cc.director.getScene());
        let data = this.texture.readPixels();
        // 写入渲染数据
        let ctx = this._canvas.getContext("2d");
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let imageData = ctx.createImageData(width, 1);
            let start = srow * width * 4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start + i];
            }
            ctx.putImageData(imageData, 0, row);
        }
        return this._canvas;
    }

    /**创建图片元素，放回这个图片生成的 SpriteFrame */
    private static getSpriteFrame() {
        return new Promise((resolve, reject) => {
            let dataURL = this._canvas.toDataURL("image/png");
            let img = document.createElement("img");
            img.src = dataURL;
            let texture = new cc.Texture2D();
            texture.initWithElement(img);
            let spriteFrame = new cc.SpriteFrame();
            spriteFrame.setTexture(texture);
            resolve(spriteFrame);

        });
    }

};