'use strict';

import NodeBase from '../util/NodeBase'
import { drawRoundRect } from '../util/shapes'

/**
 * A Box Node/Cluster shape.
 *
 * @extends NodeBase
 */
class Toast extends NodeBase {
  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  constructor (options, body, labelModule) {
    super(options,body,labelModule);
    this._setMargins(labelModule);
    this.img = new Image();
    //this.img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAARCAQAAABtcaS7AAAACXBIWXMAAAsTAAALEwEAmpwYAAADGWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBA3y7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BUNTVQYqg4jIKAX08EGIIUByaVEZhMXIwMDAIMCgxeDHUMmwiuEBozRjFOM8xqdMhkwNTJeYNZgbme+y2LDMY2VmzWa9yubEtoldhX0mhwBHJycrZzMXM1cbNzf3RB4pnqW8xryH+IL5nvFXCwgJrBZ0E3wk1CisKHxYJF2UV3SrWJw4p/hWiRRJYcmjUhXSutJPZObIhsoJyp2V71HwUeRVvKA0RTlKRUnltepWtUZ1Pw1Zjbea+7QmaqfqWOsK6b7SO6I/36DGMMrI0ljS+LfJPdPDZivM+y0qLBOtfKwtbFRtRexY7L7aP3e47XjB6ZjzXpetruvdVrov9VjkudBrgfdCn8W+y/xW+a8P2Bq4N+hY8PmQW6HPwr5EMEUKRilFG8e4xUbF5cW3JMxO3Jx0Nvl5KlOaXLpNRlRmVdas7D059/KY8tULfAqLi2YXHy55WyZR7lJRWDmv6mz131q9uvj6SQ3HGn83G7Skt85ru94h2Ond1d59uJehz76/bsK+if8nO05pnXpiOu+M4JmzZj2aozW3ZN6+BVwLwxYtXvxxqcOyCcsfrjRe1br65lrddU3rb2402NSx+cFWq21Tt3/Y6btr1R6Oven7jh9QP9h56PURv6Obj4ufqD355LT3mS3nZM+3X/h0Ke7yqasW15bdEL3ZeuvrnfS7N+/7PDjwyPTx6qeKz2a+EHzZ9Zr5Td3bn+9LP3z6VPD53de8b+9+5P/88Lv4z7d/Vf//AwAqvx2K829RWwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACIUlEQVR42oyQTUhUURiGn3PumTu/6piM2A81UY2RoqW0CMIo2lQELsJFus0Ioha2sKISQsyFtIjahrQxacKgVYugIlFDyTaRmU42Ys0i8Hdm7j333hZOliDRu34fvvd7RHwxZSpiKJ8WDhtFIJCWxU/T1bezKmhWmREus20ykI5FlJFdVzbwEM5KgOrH3JtyYiqoSuTF+SdvLuwLv2zrbRicoJoQghUEEQy+EmKMufbxrsEp70hFrzymPJX/qE7P1+98Mdy61DNw5QETSI7ynefYSA61dlftvuRPVTbNps2oiwLPV8vn0fip0NPXbao4+qW/e5j3HOQhc1y9dr/TwW5vfdU1KvA8kGARp4qZoZbGTLM4d/POjo40d0kTI9aR7FwgfFx0Lw8FMQBQIFighhIyI2okmgq8fXSrBK8jcp6zSw3fmq6nPr0zyPADH+4qAC6bWMQBGKzc86y2vL+0pWdrIhA/s5DMA4IcOUwA5Kq+PGVE0YCedJPVzfs3j98wS/1JAD8fGKCoIFr9Ni5xiCAQaFSf7ANw0AiKyZNDrPUKMZniMGXkKcfGAxyKqcAhQRAN6wEDixmWKGOeE/jxkcDHLk4yS5h6gth/AwYW0+SQuIBJBQEaibJIHgNNmDpCBUSCxCJFruAZXBw8lnHXdtsUUVcYJgVaT5P78/2GsYhQT1h7KFtP11hj/66vXoni2+tptT07ExAH+I8Itthm9tcAtWO+PXSYZ58AAAAASUVORK5CYII=';
    this.img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAUCAMAAADWUb86AAAAS1BMVEX///88O25IR3d5eJtUU4BtbJJgX4mFhKSRka3GWmdbQWyyIjSenbdTUn/ZkJnY1+K5fpBlTHWqU2iaJj+pUmevVGeqqcDFWWbYkZpi7O6kAAAAkUlEQVR4XsWPyQoDMQxDLXnLbN23///SBobekhLooU8gfPKzBayB1dQirksTgTPAsKA5aadDEwGSFlSa18JR2lCh3JJqLPToSlHgjnUL5Up0pQolEm4stXpSIGGKshcuUxOhIskHMrhC/fZsIoDC4rPt+6dI5H5gTzpXzjXzPtw70kGmIaRh+EH6GkKWIf4ifQMPyxxkRToSxwAAAABJRU5ErkJggg==';

    this.actimg = new Image();
    this.actimg.src = 'data:image/png;base64,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'

    this.cfgimg = new Image();
    this.cfgimg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBA3y7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BUNTVQYqg4jIKAX08EGIIUByaVEZhMXIwMDAIMCgxeDHUMmwiuEBozRjFOM8xqdMhkwNTJeYNZgbme+y2LDMY2VmzWa9yubEtoldhX0mhwBHJycrZzMXM1cbNzf3RB4pnqW8xryH+IL5nvFXCwgJrBZ0E3wk1CisKHxYJF2UV3SrWJw4p/hWiRRJYcmjUhXSutJPZObIhsoJyp2V71HwUeRVvKA0RTlKRUnltepWtUZ1Pw1Zjbea+7QmaqfqWOsK6b7SO6I/36DGMMrI0ljS+LfJPdPDZivM+y0qLBOtfKwtbFRtRexY7L7aP3e47XjB6ZjzXpetruvdVrov9VjkudBrgfdCn8W+y/xW+a8P2Bq4N+hY8PmQW6HPwr5EMEUKRilFG8e4xUbF5cW3JMxO3Jx0Nvl5KlOaXLpNRlRmVdas7D059/KY8tULfAqLi2YXHy55WyZR7lJRWDmv6mz131q9uvj6SQ3HGn83G7Skt85ru94h2Ond1d59uJehz76/bsK+if8nO05pnXpiOu+M4JmzZj2aozW3ZN6+BVwLwxYtXvxxqcOyCcsfrjRe1br65lrddU3rb2402NSx+cFWq21Tt3/Y6btr1R6Oven7jh9QP9h56PURv6Obj4ufqD355LT3mS3nZM+3X/h0Ke7yqasW15bdEL3ZeuvrnfS7N+/7PDjwyPTx6qeKz2a+EHzZ9Zr5Td3bn+9LP3z6VPD53de8b+9+5P/88Lv4z7d/Vf//AwAqvx2K829RWwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACK0lEQVR42kzQTU9cZQDF8d/z3OcyA9hpFQeGsKomlZ1NlUbDApIubGKiu67qZ8D0C1h3urAfoNv2C2i6coWJRBdidEGaLnxLBAZwUkphmAv3xQUT41mfnPzPP3wpM1C5akYmv7/32a9429zn5/crA39IZlQSEJWemjM5ei7gUGt0Yt9rwkVBirJPwptBPDp4cOXj4vaeiL7W7ebpwdev34udIPuteZSG4qfljeBY/mz0xWjx1AROPV9pz+Xl8VeV2vHP9aN0yIDatvhkGxNgwoDF+GRbEJwNGmlWnHrphQwRtRpRHLNXLutMVWIurjWPL4ArUc8N71kQVePt7HGzlqQTvc1q4/Buhlz2XWu9Z9JAtmqlRml64/LmP9LQq9fr5T/larPa30w8KAQtvXvFSl80cmm5++PuLyl2Tx8WSxd0Pb1OoVabl3X27Igyxd3hW+HDFLa2rpTyMc+kWuH/yf1l/3p7K4265fhv9LfB0YR50a6To0JEUDnJz7upGosg2pN9NN9paSv0V6v/FFFI4Vtq9Ux4J1MKK2crfbmRyrlMpdmMgyhKPmjk0nL9fSlT27U9Fp4J2uJauVEKIqcW3JpakqsQJUlEJbfk1tSCIVJp0VXCxe9GqUBLQjCtHRblnkldlwy9aJ2p0Jj1Bn43QGXfYSv3iq7UNfRStlOux9XGnPe9i5/8oC8YrKedSqYrloIkbmZ38oPGNTdNm3bTNY38IN3JNnNR6d8BAAxwzCM+K94iAAAAAElFTkSuQmCC';

    this.trashimg = new Image();
    this.trashimg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAQAAAADHm0dAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBA3y7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BUNTVQYqg4jIKAX08EGIIUByaVEZhMXIwMDAIMCgxeDHUMmwiuEBozRjFOM8xqdMhkwNTJeYNZgbme+y2LDMY2VmzWa9yubEtoldhX0mhwBHJycrZzMXM1cbNzf3RB4pnqW8xryH+IL5nvFXCwgJrBZ0E3wk1CisKHxYJF2UV3SrWJw4p/hWiRRJYcmjUhXSutJPZObIhsoJyp2V71HwUeRVvKA0RTlKRUnltepWtUZ1Pw1Zjbea+7QmaqfqWOsK6b7SO6I/36DGMMrI0ljS+LfJPdPDZivM+y0qLBOtfKwtbFRtRexY7L7aP3e47XjB6ZjzXpetruvdVrov9VjkudBrgfdCn8W+y/xW+a8P2Bq4N+hY8PmQW6HPwr5EMEUKRilFG8e4xUbF5cW3JMxO3Jx0Nvl5KlOaXLpNRlRmVdas7D059/KY8tULfAqLi2YXHy55WyZR7lJRWDmv6mz131q9uvj6SQ3HGn83G7Skt85ru94h2Ond1d59uJehz76/bsK+if8nO05pnXpiOu+M4JmzZj2aozW3ZN6+BVwLwxYtXvxxqcOyCcsfrjRe1br65lrddU3rb2402NSx+cFWq21Tt3/Y6btr1R6Oven7jh9QP9h56PURv6Obj4ufqD355LT3mS3nZM+3X/h0Ke7yqasW15bdEL3ZeuvrnfS7N+/7PDjwyPTx6qeKz2a+EHzZ9Zr5Td3bn+9LP3z6VPD53de8b+9+5P/88Lv4z7d/Vf//AwAqvx2K829RWwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAArUlEQVR42sSSLQ4CMRCFv9lUULnYlVxmD4NZiUFiIKnBopFYzsAdkCBBFjeI7f5ml5RNCM90Jv06eZM+URqt9EVblo00nTnqI5SeLgiendr6mbnwSbdWnRAtUbZ6B5yMIYUCOEnARk79wsB09KyFVg4PGj3V/8Prr9C0Pue9G9Ntc8lDtZaJBmYx6EkBsjJZVXaygeD4kFgnwWvKsxfjoVWl/Oi9XkfBBUsBeA8AE/ooL1veQ70AAAAASUVORK5CYII=';

  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   */
  resize(ctx, selected = this.selected, hover = this.hover) {
    if (this.needsRefresh(selected, hover)) {
      // const dimensions = this.getDimensionsFromLabel(ctx, selected, hover);
      this.textSize = this.labelModule.getTextSize(ctx, selected, hover);
      const DEFAULT_WIDTH = 180;
      const DEFAULT_HEIGHT = 100;
      const DEFAULT_RADIUS = 30;

      this.width = DEFAULT_WIDTH + this.margin.right + this.margin.left;
      this.height = DEFAULT_HEIGHT + this.margin.top + this.margin.bottom;
      this.radius = DEFAULT_RADIUS;
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   * @param {Object} pointer of x and y
   */
  draw(ctx, x, y, selected, hover, values, pointer) {
    this.resize(ctx, selected, hover);
    this.left = x - this.width / 2;
    this.top = y - this.height / 2;

    this.initContextForDraw(ctx, values);
    drawRoundRect(ctx, this.left, this.top, this.width, this.height, values.borderRadius);
    this.performFill(ctx, values);

    this.updateBoundingBox(x, y, ctx, selected, hover);
    this.labelModule.draw(ctx, this.left + this.textSize.width / 2 + this.margin.left,
                               this.top + this.textSize.height / 2 + this.margin.top + 5, selected, hover);

    ctx.drawImage(this.img, this.left + this.margin.left + 3, this.top + this.margin.top + 3, 26, 15);

    ctx.drawImage(this.actimg, this.left + this.width - this.margin.right - 3 - 20, this.top + this.margin.top + 1, 20, 20);

    if (selected) {
      if (hover) {
        const posx = this.left + this.width - this.margin.right - 3 - 20 - 3;
        const posy = this.top + this.height - this.margin.bottom - 3 - 20 - 3;
        if (pointer.x >= posx && pointer.x <= (posx + 26) && pointer.y >= posy && pointer.y <= (posy + 26)) {
          ctx.lineWidth = 0;
          ctx.strokeStyle = '#ffff00';
          ctx.fillStyle = '#ffff00';
          ctx.beginPath();

          ctx.rect(posx, posy, 26, 26);
          ctx.closePath();
          ctx.fill();
          document.body.style.cursor = 'pointer';
        } else if ((pointer.x >= posx - 26) && pointer.x <= posx && pointer.y >= posy && pointer.y <= (posy + 26)) {
          ctx.lineWidth = 0;
          ctx.strokeStyle = '#ffff00';
          ctx.fillStyle = '#ffff00';
          ctx.beginPath();

          ctx.rect(posx - 26, posy, 26, 26);
          ctx.closePath();
          ctx.fill();
          document.body.style.cursor = 'pointer';
        } else {
          document.body.style.cursor = 'default';
        }
      }


      ctx.drawImage(this.trashimg, this.left + this.width - this.margin.right - 3 - 20, this.top + this.height - this.margin.bottom - 3 - 20, 20, 20);
      ctx.drawImage(this.cfgimg, this.left + this.width - this.margin.right - 3 - 20 - 3 - 3 - 20, this.top + this.height - this.margin.bottom - 3 - 20, 20, 20);
    }
    console.log({ obj: 'toast - draw', selected: selected, hover: hover});
  }

  /**
   *
   * @param {number} x width
   * @param {number} y height
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} selected
   * @param {boolean} hover
   */
  updateBoundingBox(x, y, ctx, selected, hover) {
    this._updateBoundingBox(x, y, ctx, selected, hover);

    const borderRadius = this.options.shapeProperties.borderRadius; // only effective for box
    this._addBoundingBoxMargin(borderRadius);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    if (ctx) {
      this.resize(ctx);
    }
    const borderWidth = this.options.borderWidth;

    return Math.min(
        Math.abs((this.width) / 2 / Math.cos(angle)),
        Math.abs((this.height)  / 2 / Math.sin(angle))) + borderWidth;
  }
}

export default Toast;
