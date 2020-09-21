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
    this.img.src = 'data:image/png;base64,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';

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
   */
  draw(ctx, x, y, selected, hover, values) {
    this.resize(ctx, selected, hover);
    this.left = x - this.width / 2;
    this.top = y - this.height / 2;

    this.initContextForDraw(ctx, values);
    drawRoundRect(ctx, this.left, this.top, this.width, this.height, values.borderRadius);
    this.performFill(ctx, values);

    this.updateBoundingBox(x, y, ctx, selected, hover);
    this.labelModule.draw(ctx, this.left + this.textSize.width / 2 + this.margin.left,
                               this.top + this.textSize.height / 2 + this.margin.top, selected, hover);

    ctx.drawImage(this.img, x - 20, this.top + 15, 40, 36);
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
