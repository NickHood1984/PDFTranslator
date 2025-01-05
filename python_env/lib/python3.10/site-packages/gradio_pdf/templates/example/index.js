var Kt = {
  /***/
  976: (
    /***/
    (at, W, V) => {
      V.d(W, {
        AnnotationLayer: () => (
          /* binding */
          ut
        ),
        FreeTextAnnotationElement: () => (
          /* binding */
          z
        ),
        InkAnnotationElement: () => (
          /* binding */
          et
        ),
        StampAnnotationElement: () => (
          /* binding */
          dt
        )
      });
      var y = V(292), B = V(419), N = V(792);
      function U(st) {
        return Math.floor(Math.max(0, Math.min(1, st)) * 255).toString(16).padStart(2, "0");
      }
      function L(st) {
        return Math.max(0, Math.min(255, 255 * st));
      }
      class C {
        static CMYK_G([b, l, e, n]) {
          return ["G", 1 - Math.min(1, 0.3 * b + 0.59 * e + 0.11 * l + n)];
        }
        static G_CMYK([b]) {
          return ["CMYK", 0, 0, 0, 1 - b];
        }
        static G_RGB([b]) {
          return ["RGB", b, b, b];
        }
        static G_rgb([b]) {
          return b = L(b), [b, b, b];
        }
        static G_HTML([b]) {
          const l = U(b);
          return `#${l}${l}${l}`;
        }
        static RGB_G([b, l, e]) {
          return ["G", 0.3 * b + 0.59 * l + 0.11 * e];
        }
        static RGB_rgb(b) {
          return b.map(L);
        }
        static RGB_HTML(b) {
          return `#${b.map(U).join("")}`;
        }
        static T_HTML() {
          return "#00000000";
        }
        static T_rgb() {
          return [null];
        }
        static CMYK_RGB([b, l, e, n]) {
          return ["RGB", 1 - Math.min(1, b + n), 1 - Math.min(1, e + n), 1 - Math.min(1, l + n)];
        }
        static CMYK_rgb([b, l, e, n]) {
          return [L(1 - Math.min(1, b + n)), L(1 - Math.min(1, e + n)), L(1 - Math.min(1, l + n))];
        }
        static CMYK_HTML(b) {
          const l = this.CMYK_RGB(b).slice(1);
          return this.RGB_HTML(l);
        }
        static RGB_CMYK([b, l, e]) {
          const n = 1 - b, p = 1 - l, o = 1 - e, a = Math.min(n, p, o);
          return ["CMYK", n, p, o, a];
        }
      }
      var x = V(284);
      const A = 1e3, r = 9, d = /* @__PURE__ */ new WeakSet();
      function c(st) {
        return {
          width: st[2] - st[0],
          height: st[3] - st[1]
        };
      }
      class m {
        static create(b) {
          switch (b.data.annotationType) {
            case y.AnnotationType.LINK:
              return new g(b);
            case y.AnnotationType.TEXT:
              return new t(b);
            case y.AnnotationType.WIDGET:
              switch (b.data.fieldType) {
                case "Tx":
                  return new h(b);
                case "Btn":
                  return b.data.radioButton ? new S(b) : b.data.checkBox ? new w(b) : new P(b);
                case "Ch":
                  return new M(b);
                case "Sig":
                  return new f(b);
              }
              return new i(b);
            case y.AnnotationType.POPUP:
              return new O(b);
            case y.AnnotationType.FREETEXT:
              return new z(b);
            case y.AnnotationType.LINE:
              return new K(b);
            case y.AnnotationType.SQUARE:
              return new nt(b);
            case y.AnnotationType.CIRCLE:
              return new j(b);
            case y.AnnotationType.POLYLINE:
              return new H(b);
            case y.AnnotationType.CARET:
              return new Y(b);
            case y.AnnotationType.INK:
              return new et(b);
            case y.AnnotationType.POLYGON:
              return new G(b);
            case y.AnnotationType.HIGHLIGHT:
              return new tt(b);
            case y.AnnotationType.UNDERLINE:
              return new ot(b);
            case y.AnnotationType.SQUIGGLY:
              return new ct(b);
            case y.AnnotationType.STRIKEOUT:
              return new pt(b);
            case y.AnnotationType.STAMP:
              return new dt(b);
            case y.AnnotationType.FILEATTACHMENT:
              return new ht(b);
            default:
              return new s(b);
          }
        }
      }
      class s {
        #t = null;
        #e = !1;
        constructor(b, {
          isRenderable: l = !1,
          ignoreBorder: e = !1,
          createQuadrilaterals: n = !1
        } = {}) {
          this.isRenderable = l, this.data = b.data, this.layer = b.layer, this.linkService = b.linkService, this.downloadManager = b.downloadManager, this.imageResourcesPath = b.imageResourcesPath, this.renderForms = b.renderForms, this.svgFactory = b.svgFactory, this.annotationStorage = b.annotationStorage, this.enableScripting = b.enableScripting, this.hasJSActions = b.hasJSActions, this._fieldObjects = b.fieldObjects, this.parent = b.parent, l && (this.container = this._createContainer(e)), n && this._createQuadrilaterals();
        }
        static _hasPopupData({
          titleObj: b,
          contentsObj: l,
          richText: e
        }) {
          return !!(b?.str || l?.str || e?.str);
        }
        get hasPopupData() {
          return s._hasPopupData(this.data);
        }
        updateEdited(b) {
          if (!this.container)
            return;
          this.#t ||= {
            rect: this.data.rect.slice(0)
          };
          const {
            rect: l
          } = b;
          l && this.#s(l);
        }
        resetEdited() {
          this.#t && (this.#s(this.#t.rect), this.#t = null);
        }
        #s(b) {
          const {
            container: {
              style: l
            },
            data: {
              rect: e,
              rotation: n
            },
            parent: {
              viewport: {
                rawDims: {
                  pageWidth: p,
                  pageHeight: o,
                  pageX: a,
                  pageY: u
                }
              }
            }
          } = this;
          e?.splice(0, 4, ...b);
          const {
            width: v,
            height: E
          } = c(b);
          l.left = `${100 * (b[0] - a) / p}%`, l.top = `${100 * (o - b[3] + u) / o}%`, n === 0 ? (l.width = `${100 * v / p}%`, l.height = `${100 * E / o}%`) : this.setRotation(n);
        }
        _createContainer(b) {
          const {
            data: l,
            parent: {
              page: e,
              viewport: n
            }
          } = this, p = document.createElement("section");
          p.setAttribute("data-annotation-id", l.id), this instanceof i || (p.tabIndex = A);
          const {
            style: o
          } = p;
          if (o.zIndex = this.parent.zIndex++, l.popupRef && p.setAttribute("aria-haspopup", "dialog"), l.alternativeText && (p.title = l.alternativeText), l.noRotate && p.classList.add("norotate"), !l.rect || this instanceof O) {
            const {
              rotation: F
            } = l;
            return !l.hasOwnCanvas && F !== 0 && this.setRotation(F, p), p;
          }
          const {
            width: a,
            height: u
          } = c(l.rect);
          if (!b && l.borderStyle.width > 0) {
            o.borderWidth = `${l.borderStyle.width}px`;
            const F = l.borderStyle.horizontalCornerRadius, T = l.borderStyle.verticalCornerRadius;
            if (F > 0 || T > 0) {
              const Q = `calc(${F}px * var(--scale-factor)) / calc(${T}px * var(--scale-factor))`;
              o.borderRadius = Q;
            } else if (this instanceof S) {
              const Q = `calc(${a}px * var(--scale-factor)) / calc(${u}px * var(--scale-factor))`;
              o.borderRadius = Q;
            }
            switch (l.borderStyle.style) {
              case y.AnnotationBorderStyleType.SOLID:
                o.borderStyle = "solid";
                break;
              case y.AnnotationBorderStyleType.DASHED:
                o.borderStyle = "dashed";
                break;
              case y.AnnotationBorderStyleType.BEVELED:
                (0, y.warn)("Unimplemented border style: beveled");
                break;
              case y.AnnotationBorderStyleType.INSET:
                (0, y.warn)("Unimplemented border style: inset");
                break;
              case y.AnnotationBorderStyleType.UNDERLINE:
                o.borderBottomStyle = "solid";
                break;
            }
            const X = l.borderColor || null;
            X ? (this.#e = !0, o.borderColor = y.Util.makeHexColor(X[0] | 0, X[1] | 0, X[2] | 0)) : o.borderWidth = 0;
          }
          const v = y.Util.normalizeRect([l.rect[0], e.view[3] - l.rect[1] + e.view[1], l.rect[2], e.view[3] - l.rect[3] + e.view[1]]), {
            pageWidth: E,
            pageHeight: R,
            pageX: k,
            pageY: D
          } = n.rawDims;
          o.left = `${100 * (v[0] - k) / E}%`, o.top = `${100 * (v[1] - D) / R}%`;
          const {
            rotation: I
          } = l;
          return l.hasOwnCanvas || I === 0 ? (o.width = `${100 * a / E}%`, o.height = `${100 * u / R}%`) : this.setRotation(I, p), p;
        }
        setRotation(b, l = this.container) {
          if (!this.data.rect)
            return;
          const {
            pageWidth: e,
            pageHeight: n
          } = this.parent.viewport.rawDims, {
            width: p,
            height: o
          } = c(this.data.rect);
          let a, u;
          b % 180 === 0 ? (a = 100 * p / e, u = 100 * o / n) : (a = 100 * o / e, u = 100 * p / n), l.style.width = `${a}%`, l.style.height = `${u}%`, l.setAttribute("data-main-rotation", (360 - b) % 360);
        }
        get _commonActions() {
          const b = (l, e, n) => {
            const p = n.detail[l], o = p[0], a = p.slice(1);
            n.target.style[e] = C[`${o}_HTML`](a), this.annotationStorage.setValue(this.data.id, {
              [e]: C[`${o}_rgb`](a)
            });
          };
          return (0, y.shadow)(this, "_commonActions", {
            display: (l) => {
              const {
                display: e
              } = l.detail, n = e % 2 === 1;
              this.container.style.visibility = n ? "hidden" : "visible", this.annotationStorage.setValue(this.data.id, {
                noView: n,
                noPrint: e === 1 || e === 2
              });
            },
            print: (l) => {
              this.annotationStorage.setValue(this.data.id, {
                noPrint: !l.detail.print
              });
            },
            hidden: (l) => {
              const {
                hidden: e
              } = l.detail;
              this.container.style.visibility = e ? "hidden" : "visible", this.annotationStorage.setValue(this.data.id, {
                noPrint: e,
                noView: e
              });
            },
            focus: (l) => {
              setTimeout(() => l.target.focus({
                preventScroll: !1
              }), 0);
            },
            userName: (l) => {
              l.target.title = l.detail.userName;
            },
            readonly: (l) => {
              l.target.disabled = l.detail.readonly;
            },
            required: (l) => {
              this._setRequired(l.target, l.detail.required);
            },
            bgColor: (l) => {
              b("bgColor", "backgroundColor", l);
            },
            fillColor: (l) => {
              b("fillColor", "backgroundColor", l);
            },
            fgColor: (l) => {
              b("fgColor", "color", l);
            },
            textColor: (l) => {
              b("textColor", "color", l);
            },
            borderColor: (l) => {
              b("borderColor", "borderColor", l);
            },
            strokeColor: (l) => {
              b("strokeColor", "borderColor", l);
            },
            rotation: (l) => {
              const e = l.detail.rotation;
              this.setRotation(e), this.annotationStorage.setValue(this.data.id, {
                rotation: e
              });
            }
          });
        }
        _dispatchEventFromSandbox(b, l) {
          const e = this._commonActions;
          for (const n of Object.keys(l.detail))
            (b[n] || e[n])?.(l);
        }
        _setDefaultPropertiesFromJS(b) {
          if (!this.enableScripting)
            return;
          const l = this.annotationStorage.getRawValue(this.data.id);
          if (!l)
            return;
          const e = this._commonActions;
          for (const [n, p] of Object.entries(l)) {
            const o = e[n];
            if (o) {
              const a = {
                detail: {
                  [n]: p
                },
                target: b
              };
              o(a), delete l[n];
            }
          }
        }
        _createQuadrilaterals() {
          if (!this.container)
            return;
          const {
            quadPoints: b
          } = this.data;
          if (!b)
            return;
          const [l, e, n, p] = this.data.rect;
          if (b.length === 1) {
            const [, {
              x: F,
              y: T
            }, {
              x: X,
              y: Q
            }] = b[0];
            if (n === F && p === T && l === X && e === Q)
              return;
          }
          const {
            style: o
          } = this.container;
          let a;
          if (this.#e) {
            const {
              borderColor: F,
              borderWidth: T
            } = o;
            o.borderWidth = 0, a = ["url('data:image/svg+xml;utf8,", '<svg xmlns="http://www.w3.org/2000/svg"', ' preserveAspectRatio="none" viewBox="0 0 1 1">', `<g fill="transparent" stroke="${F}" stroke-width="${T}">`], this.container.classList.add("hasBorder");
          }
          const u = n - l, v = p - e, {
            svgFactory: E
          } = this, R = E.createElement("svg");
          R.classList.add("quadrilateralsContainer"), R.setAttribute("width", 0), R.setAttribute("height", 0);
          const k = E.createElement("defs");
          R.append(k);
          const D = E.createElement("clipPath"), I = `clippath_${this.data.id}`;
          D.setAttribute("id", I), D.setAttribute("clipPathUnits", "objectBoundingBox"), k.append(D);
          for (const [, {
            x: F,
            y: T
          }, {
            x: X,
            y: Q
          }] of b) {
            const $ = E.createElement("rect"), q = (X - l) / u, rt = (p - T) / v, Z = (F - X) / u, J = (T - Q) / v;
            $.setAttribute("x", q), $.setAttribute("y", rt), $.setAttribute("width", Z), $.setAttribute("height", J), D.append($), a?.push(`<rect vector-effect="non-scaling-stroke" x="${q}" y="${rt}" width="${Z}" height="${J}"/>`);
          }
          this.#e && (a.push("</g></svg>')"), o.backgroundImage = a.join("")), this.container.append(R), this.container.style.clipPath = `url(#${I})`;
        }
        _createPopup() {
          const {
            container: b,
            data: l
          } = this;
          b.setAttribute("aria-haspopup", "dialog");
          const e = new O({
            data: {
              color: l.color,
              titleObj: l.titleObj,
              modificationDate: l.modificationDate,
              contentsObj: l.contentsObj,
              richText: l.richText,
              parentRect: l.rect,
              borderStyle: 0,
              id: `popup_${l.id}`,
              rotation: l.rotation
            },
            parent: this.parent,
            elements: [this]
          });
          this.parent.div.append(e.render());
        }
        render() {
          (0, y.unreachable)("Abstract method `AnnotationElement.render` called");
        }
        _getElementsByName(b, l = null) {
          const e = [];
          if (this._fieldObjects) {
            const n = this._fieldObjects[b];
            if (n)
              for (const {
                page: p,
                id: o,
                exportValues: a
              } of n) {
                if (p === -1 || o === l)
                  continue;
                const u = typeof a == "string" ? a : null, v = document.querySelector(`[data-element-id="${o}"]`);
                if (v && !d.has(v)) {
                  (0, y.warn)(`_getElementsByName - element not allowed: ${o}`);
                  continue;
                }
                e.push({
                  id: o,
                  exportValue: u,
                  domElement: v
                });
              }
            return e;
          }
          for (const n of document.getElementsByName(b)) {
            const {
              exportValue: p
            } = n, o = n.getAttribute("data-element-id");
            o !== l && d.has(n) && e.push({
              id: o,
              exportValue: p,
              domElement: n
            });
          }
          return e;
        }
        show() {
          this.container && (this.container.hidden = !1), this.popup?.maybeShow();
        }
        hide() {
          this.container && (this.container.hidden = !0), this.popup?.forceHide();
        }
        getElementsToTriggerPopup() {
          return this.container;
        }
        addHighlightArea() {
          const b = this.getElementsToTriggerPopup();
          if (Array.isArray(b))
            for (const l of b)
              l.classList.add("highlightArea");
          else
            b.classList.add("highlightArea");
        }
        get _isEditable() {
          return !1;
        }
        _editOnDoubleClick() {
          if (!this._isEditable)
            return;
          const {
            annotationEditorType: b,
            data: {
              id: l
            }
          } = this;
          this.container.addEventListener("dblclick", () => {
            this.linkService.eventBus?.dispatch("switchannotationeditormode", {
              source: this,
              mode: b,
              editId: l
            });
          });
        }
      }
      class g extends s {
        constructor(b, l = null) {
          super(b, {
            isRenderable: !0,
            ignoreBorder: !!l?.ignoreBorder,
            createQuadrilaterals: !0
          }), this.isTooltipOnly = b.data.isTooltipOnly;
        }
        render() {
          const {
            data: b,
            linkService: l
          } = this, e = document.createElement("a");
          e.setAttribute("data-element-id", b.id);
          let n = !1;
          return b.url ? (l.addLinkAttributes(e, b.url, b.newWindow), n = !0) : b.action ? (this._bindNamedAction(e, b.action), n = !0) : b.attachment ? (this.#e(e, b.attachment, b.attachmentDest), n = !0) : b.setOCGState ? (this.#s(e, b.setOCGState), n = !0) : b.dest ? (this._bindLink(e, b.dest), n = !0) : (b.actions && (b.actions.Action || b.actions["Mouse Up"] || b.actions["Mouse Down"]) && this.enableScripting && this.hasJSActions && (this._bindJSAction(e, b), n = !0), b.resetForm ? (this._bindResetFormAction(e, b.resetForm), n = !0) : this.isTooltipOnly && !n && (this._bindLink(e, ""), n = !0)), this.container.classList.add("linkAnnotation"), n && this.container.append(e), this.container;
        }
        #t() {
          this.container.setAttribute("data-internal-link", "");
        }
        _bindLink(b, l) {
          b.href = this.linkService.getDestinationHash(l), b.onclick = () => (l && this.linkService.goToDestination(l), !1), (l || l === "") && this.#t();
        }
        _bindNamedAction(b, l) {
          b.href = this.linkService.getAnchorUrl(""), b.onclick = () => (this.linkService.executeNamedAction(l), !1), this.#t();
        }
        #e(b, l, e = null) {
          b.href = this.linkService.getAnchorUrl(""), b.onclick = () => (this.downloadManager?.openOrDownloadData(l.content, l.filename, e), !1), this.#t();
        }
        #s(b, l) {
          b.href = this.linkService.getAnchorUrl(""), b.onclick = () => (this.linkService.executeSetOCGState(l), !1), this.#t();
        }
        _bindJSAction(b, l) {
          b.href = this.linkService.getAnchorUrl("");
          const e = /* @__PURE__ */ new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]);
          for (const n of Object.keys(l.actions)) {
            const p = e.get(n);
            p && (b[p] = () => (this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id: l.id,
                name: n
              }
            }), !1));
          }
          b.onclick || (b.onclick = () => !1), this.#t();
        }
        _bindResetFormAction(b, l) {
          const e = b.onclick;
          if (e || (b.href = this.linkService.getAnchorUrl("")), this.#t(), !this._fieldObjects) {
            (0, y.warn)('_bindResetFormAction - "resetForm" action not supported, ensure that the `fieldObjects` parameter is provided.'), e || (b.onclick = () => !1);
            return;
          }
          b.onclick = () => {
            e?.();
            const {
              fields: n,
              refs: p,
              include: o
            } = l, a = [];
            if (n.length !== 0 || p.length !== 0) {
              const E = new Set(p);
              for (const R of n) {
                const k = this._fieldObjects[R] || [];
                for (const {
                  id: D
                } of k)
                  E.add(D);
              }
              for (const R of Object.values(this._fieldObjects))
                for (const k of R)
                  E.has(k.id) === o && a.push(k);
            } else
              for (const E of Object.values(this._fieldObjects))
                a.push(...E);
            const u = this.annotationStorage, v = [];
            for (const E of a) {
              const {
                id: R
              } = E;
              switch (v.push(R), E.type) {
                case "text": {
                  const D = E.defaultValue || "";
                  u.setValue(R, {
                    value: D
                  });
                  break;
                }
                case "checkbox":
                case "radiobutton": {
                  const D = E.defaultValue === E.exportValues;
                  u.setValue(R, {
                    value: D
                  });
                  break;
                }
                case "combobox":
                case "listbox": {
                  const D = E.defaultValue || "";
                  u.setValue(R, {
                    value: D
                  });
                  break;
                }
                default:
                  continue;
              }
              const k = document.querySelector(`[data-element-id="${R}"]`);
              if (k) {
                if (!d.has(k)) {
                  (0, y.warn)(`_bindResetFormAction - element not allowed: ${R}`);
                  continue;
                }
              } else continue;
              k.dispatchEvent(new Event("resetform"));
            }
            return this.enableScripting && this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id: "app",
                ids: v,
                name: "ResetForm"
              }
            }), !1;
          };
        }
      }
      class t extends s {
        constructor(b) {
          super(b, {
            isRenderable: !0
          });
        }
        render() {
          this.container.classList.add("textAnnotation");
          const b = document.createElement("img");
          return b.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg", b.setAttribute("data-l10n-id", "pdfjs-text-annotation-type"), b.setAttribute("data-l10n-args", JSON.stringify({
            type: this.data.name
          })), !this.data.popupRef && this.hasPopupData && this._createPopup(), this.container.append(b), this.container;
        }
      }
      class i extends s {
        render() {
          return this.container;
        }
        showElementAndHideCanvas(b) {
          this.data.hasOwnCanvas && (b.previousSibling?.nodeName === "CANVAS" && (b.previousSibling.hidden = !0), b.hidden = !1);
        }
        _getKeyModifier(b) {
          return y.FeatureTest.platform.isMac ? b.metaKey : b.ctrlKey;
        }
        _setEventListener(b, l, e, n, p) {
          e.includes("mouse") ? b.addEventListener(e, (o) => {
            this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id: this.data.id,
                name: n,
                value: p(o),
                shift: o.shiftKey,
                modifier: this._getKeyModifier(o)
              }
            });
          }) : b.addEventListener(e, (o) => {
            if (e === "blur") {
              if (!l.focused || !o.relatedTarget)
                return;
              l.focused = !1;
            } else if (e === "focus") {
              if (l.focused)
                return;
              l.focused = !0;
            }
            p && this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id: this.data.id,
                name: n,
                value: p(o)
              }
            });
          });
        }
        _setEventListeners(b, l, e, n) {
          for (const [p, o] of e)
            (o === "Action" || this.data.actions?.[o]) && ((o === "Focus" || o === "Blur") && (l ||= {
              focused: !1
            }), this._setEventListener(b, l, p, o, n), o === "Focus" && !this.data.actions?.Blur ? this._setEventListener(b, l, "blur", "Blur", null) : o === "Blur" && !this.data.actions?.Focus && this._setEventListener(b, l, "focus", "Focus", null));
        }
        _setBackgroundColor(b) {
          const l = this.data.backgroundColor || null;
          b.style.backgroundColor = l === null ? "transparent" : y.Util.makeHexColor(l[0], l[1], l[2]);
        }
        _setTextStyle(b) {
          const l = ["left", "center", "right"], {
            fontColor: e
          } = this.data.defaultAppearanceData, n = this.data.defaultAppearanceData.fontSize || r, p = b.style;
          let o;
          const a = 2, u = (v) => Math.round(10 * v) / 10;
          if (this.data.multiLine) {
            const v = Math.abs(this.data.rect[3] - this.data.rect[1] - a), E = Math.round(v / (y.LINE_FACTOR * n)) || 1, R = v / E;
            o = Math.min(n, u(R / y.LINE_FACTOR));
          } else {
            const v = Math.abs(this.data.rect[3] - this.data.rect[1] - a);
            o = Math.min(n, u(v / y.LINE_FACTOR));
          }
          p.fontSize = `calc(${o}px * var(--scale-factor))`, p.color = y.Util.makeHexColor(e[0], e[1], e[2]), this.data.textAlignment !== null && (p.textAlign = l[this.data.textAlignment]);
        }
        _setRequired(b, l) {
          l ? b.setAttribute("required", !0) : b.removeAttribute("required"), b.setAttribute("aria-required", l);
        }
      }
      class h extends i {
        constructor(b) {
          const l = b.renderForms || b.data.hasOwnCanvas || !b.data.hasAppearance && !!b.data.fieldValue;
          super(b, {
            isRenderable: l
          });
        }
        setPropertyOnSiblings(b, l, e, n) {
          const p = this.annotationStorage;
          for (const o of this._getElementsByName(b.name, b.id))
            o.domElement && (o.domElement[l] = e), p.setValue(o.id, {
              [n]: e
            });
        }
        render() {
          const b = this.annotationStorage, l = this.data.id;
          this.container.classList.add("textWidgetAnnotation");
          let e = null;
          if (this.renderForms) {
            const n = b.getValue(l, {
              value: this.data.fieldValue
            });
            let p = n.value || "";
            const o = b.getValue(l, {
              charLimit: this.data.maxLen
            }).charLimit;
            o && p.length > o && (p = p.slice(0, o));
            let a = n.formattedValue || this.data.textContent?.join(`
`) || null;
            a && this.data.comb && (a = a.replaceAll(/\s+/g, ""));
            const u = {
              userValue: p,
              formattedValue: a,
              lastCommittedValue: null,
              commitKey: 1,
              focused: !1
            };
            this.data.multiLine ? (e = document.createElement("textarea"), e.textContent = a ?? p, this.data.doNotScroll && (e.style.overflowY = "hidden")) : (e = document.createElement("input"), e.type = "text", e.setAttribute("value", a ?? p), this.data.doNotScroll && (e.style.overflowX = "hidden")), this.data.hasOwnCanvas && (e.hidden = !0), d.add(e), e.setAttribute("data-element-id", l), e.disabled = this.data.readOnly, e.name = this.data.fieldName, e.tabIndex = A, this._setRequired(e, this.data.required), o && (e.maxLength = o), e.addEventListener("input", (E) => {
              b.setValue(l, {
                value: E.target.value
              }), this.setPropertyOnSiblings(e, "value", E.target.value, "value"), u.formattedValue = null;
            }), e.addEventListener("resetform", (E) => {
              const R = this.data.defaultFieldValue ?? "";
              e.value = u.userValue = R, u.formattedValue = null;
            });
            let v = (E) => {
              const {
                formattedValue: R
              } = u;
              R != null && (E.target.value = R), E.target.scrollLeft = 0;
            };
            if (this.enableScripting && this.hasJSActions) {
              e.addEventListener("focus", (R) => {
                if (u.focused)
                  return;
                const {
                  target: k
                } = R;
                u.userValue && (k.value = u.userValue), u.lastCommittedValue = k.value, u.commitKey = 1, this.data.actions?.Focus || (u.focused = !0);
              }), e.addEventListener("updatefromsandbox", (R) => {
                this.showElementAndHideCanvas(R.target);
                const k = {
                  value(D) {
                    u.userValue = D.detail.value ?? "", b.setValue(l, {
                      value: u.userValue.toString()
                    }), D.target.value = u.userValue;
                  },
                  formattedValue(D) {
                    const {
                      formattedValue: I
                    } = D.detail;
                    u.formattedValue = I, I != null && D.target !== document.activeElement && (D.target.value = I), b.setValue(l, {
                      formattedValue: I
                    });
                  },
                  selRange(D) {
                    D.target.setSelectionRange(...D.detail.selRange);
                  },
                  charLimit: (D) => {
                    const {
                      charLimit: I
                    } = D.detail, {
                      target: F
                    } = D;
                    if (I === 0) {
                      F.removeAttribute("maxLength");
                      return;
                    }
                    F.setAttribute("maxLength", I);
                    let T = u.userValue;
                    !T || T.length <= I || (T = T.slice(0, I), F.value = u.userValue = T, b.setValue(l, {
                      value: T
                    }), this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                      source: this,
                      detail: {
                        id: l,
                        name: "Keystroke",
                        value: T,
                        willCommit: !0,
                        commitKey: 1,
                        selStart: F.selectionStart,
                        selEnd: F.selectionEnd
                      }
                    }));
                  }
                };
                this._dispatchEventFromSandbox(k, R);
              }), e.addEventListener("keydown", (R) => {
                u.commitKey = 1;
                let k = -1;
                if (R.key === "Escape" ? k = 0 : R.key === "Enter" && !this.data.multiLine ? k = 2 : R.key === "Tab" && (u.commitKey = 3), k === -1)
                  return;
                const {
                  value: D
                } = R.target;
                u.lastCommittedValue !== D && (u.lastCommittedValue = D, u.userValue = D, this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                  source: this,
                  detail: {
                    id: l,
                    name: "Keystroke",
                    value: D,
                    willCommit: !0,
                    commitKey: k,
                    selStart: R.target.selectionStart,
                    selEnd: R.target.selectionEnd
                  }
                }));
              });
              const E = v;
              v = null, e.addEventListener("blur", (R) => {
                if (!u.focused || !R.relatedTarget)
                  return;
                this.data.actions?.Blur || (u.focused = !1);
                const {
                  value: k
                } = R.target;
                u.userValue = k, u.lastCommittedValue !== k && this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                  source: this,
                  detail: {
                    id: l,
                    name: "Keystroke",
                    value: k,
                    willCommit: !0,
                    commitKey: u.commitKey,
                    selStart: R.target.selectionStart,
                    selEnd: R.target.selectionEnd
                  }
                }), E(R);
              }), this.data.actions?.Keystroke && e.addEventListener("beforeinput", (R) => {
                u.lastCommittedValue = null;
                const {
                  data: k,
                  target: D
                } = R, {
                  value: I,
                  selectionStart: F,
                  selectionEnd: T
                } = D;
                let X = F, Q = T;
                switch (R.inputType) {
                  case "deleteWordBackward": {
                    const $ = I.substring(0, F).match(/\w*[^\w]*$/);
                    $ && (X -= $[0].length);
                    break;
                  }
                  case "deleteWordForward": {
                    const $ = I.substring(F).match(/^[^\w]*\w*/);
                    $ && (Q += $[0].length);
                    break;
                  }
                  case "deleteContentBackward":
                    F === T && (X -= 1);
                    break;
                  case "deleteContentForward":
                    F === T && (Q += 1);
                    break;
                }
                R.preventDefault(), this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                  source: this,
                  detail: {
                    id: l,
                    name: "Keystroke",
                    value: I,
                    change: k || "",
                    willCommit: !1,
                    selStart: X,
                    selEnd: Q
                  }
                });
              }), this._setEventListeners(e, u, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (R) => R.target.value);
            }
            if (v && e.addEventListener("blur", v), this.data.comb) {
              const R = (this.data.rect[2] - this.data.rect[0]) / o;
              e.classList.add("comb"), e.style.letterSpacing = `calc(${R}px * var(--scale-factor) - 1ch)`;
            }
          } else
            e = document.createElement("div"), e.textContent = this.data.fieldValue, e.style.verticalAlign = "middle", e.style.display = "table-cell", this.data.hasOwnCanvas && (e.hidden = !0);
          return this._setTextStyle(e), this._setBackgroundColor(e), this._setDefaultPropertiesFromJS(e), this.container.append(e), this.container;
        }
      }
      class f extends i {
        constructor(b) {
          super(b, {
            isRenderable: !!b.data.hasOwnCanvas
          });
        }
      }
      class w extends i {
        constructor(b) {
          super(b, {
            isRenderable: b.renderForms
          });
        }
        render() {
          const b = this.annotationStorage, l = this.data, e = l.id;
          let n = b.getValue(e, {
            value: l.exportValue === l.fieldValue
          }).value;
          typeof n == "string" && (n = n !== "Off", b.setValue(e, {
            value: n
          })), this.container.classList.add("buttonWidgetAnnotation", "checkBox");
          const p = document.createElement("input");
          return d.add(p), p.setAttribute("data-element-id", e), p.disabled = l.readOnly, this._setRequired(p, this.data.required), p.type = "checkbox", p.name = l.fieldName, n && p.setAttribute("checked", !0), p.setAttribute("exportValue", l.exportValue), p.tabIndex = A, p.addEventListener("change", (o) => {
            const {
              name: a,
              checked: u
            } = o.target;
            for (const v of this._getElementsByName(a, e)) {
              const E = u && v.exportValue === l.exportValue;
              v.domElement && (v.domElement.checked = E), b.setValue(v.id, {
                value: E
              });
            }
            b.setValue(e, {
              value: u
            });
          }), p.addEventListener("resetform", (o) => {
            const a = l.defaultFieldValue || "Off";
            o.target.checked = a === l.exportValue;
          }), this.enableScripting && this.hasJSActions && (p.addEventListener("updatefromsandbox", (o) => {
            const a = {
              value(u) {
                u.target.checked = u.detail.value !== "Off", b.setValue(e, {
                  value: u.target.checked
                });
              }
            };
            this._dispatchEventFromSandbox(a, o);
          }), this._setEventListeners(p, null, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (o) => o.target.checked)), this._setBackgroundColor(p), this._setDefaultPropertiesFromJS(p), this.container.append(p), this.container;
        }
      }
      class S extends i {
        constructor(b) {
          super(b, {
            isRenderable: b.renderForms
          });
        }
        render() {
          this.container.classList.add("buttonWidgetAnnotation", "radioButton");
          const b = this.annotationStorage, l = this.data, e = l.id;
          let n = b.getValue(e, {
            value: l.fieldValue === l.buttonValue
          }).value;
          if (typeof n == "string" && (n = n !== l.buttonValue, b.setValue(e, {
            value: n
          })), n)
            for (const o of this._getElementsByName(l.fieldName, e))
              b.setValue(o.id, {
                value: !1
              });
          const p = document.createElement("input");
          if (d.add(p), p.setAttribute("data-element-id", e), p.disabled = l.readOnly, this._setRequired(p, this.data.required), p.type = "radio", p.name = l.fieldName, n && p.setAttribute("checked", !0), p.tabIndex = A, p.addEventListener("change", (o) => {
            const {
              name: a,
              checked: u
            } = o.target;
            for (const v of this._getElementsByName(a, e))
              b.setValue(v.id, {
                value: !1
              });
            b.setValue(e, {
              value: u
            });
          }), p.addEventListener("resetform", (o) => {
            const a = l.defaultFieldValue;
            o.target.checked = a != null && a === l.buttonValue;
          }), this.enableScripting && this.hasJSActions) {
            const o = l.buttonValue;
            p.addEventListener("updatefromsandbox", (a) => {
              const u = {
                value: (v) => {
                  const E = o === v.detail.value;
                  for (const R of this._getElementsByName(v.target.name)) {
                    const k = E && R.id === e;
                    R.domElement && (R.domElement.checked = k), b.setValue(R.id, {
                      value: k
                    });
                  }
                }
              };
              this._dispatchEventFromSandbox(u, a);
            }), this._setEventListeners(p, null, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (a) => a.target.checked);
          }
          return this._setBackgroundColor(p), this._setDefaultPropertiesFromJS(p), this.container.append(p), this.container;
        }
      }
      class P extends g {
        constructor(b) {
          super(b, {
            ignoreBorder: b.data.hasAppearance
          });
        }
        render() {
          const b = super.render();
          b.classList.add("buttonWidgetAnnotation", "pushButton");
          const l = b.lastChild;
          return this.enableScripting && this.hasJSActions && l && (this._setDefaultPropertiesFromJS(l), l.addEventListener("updatefromsandbox", (e) => {
            this._dispatchEventFromSandbox({}, e);
          })), b;
        }
      }
      class M extends i {
        constructor(b) {
          super(b, {
            isRenderable: b.renderForms
          });
        }
        render() {
          this.container.classList.add("choiceWidgetAnnotation");
          const b = this.annotationStorage, l = this.data.id, e = b.getValue(l, {
            value: this.data.fieldValue
          }), n = document.createElement("select");
          d.add(n), n.setAttribute("data-element-id", l), n.disabled = this.data.readOnly, this._setRequired(n, this.data.required), n.name = this.data.fieldName, n.tabIndex = A;
          let p = this.data.combo && this.data.options.length > 0;
          this.data.combo || (n.size = this.data.options.length, this.data.multiSelect && (n.multiple = !0)), n.addEventListener("resetform", (E) => {
            const R = this.data.defaultFieldValue;
            for (const k of n.options)
              k.selected = k.value === R;
          });
          for (const E of this.data.options) {
            const R = document.createElement("option");
            R.textContent = E.displayValue, R.value = E.exportValue, e.value.includes(E.exportValue) && (R.setAttribute("selected", !0), p = !1), n.append(R);
          }
          let o = null;
          if (p) {
            const E = document.createElement("option");
            E.value = " ", E.setAttribute("hidden", !0), E.setAttribute("selected", !0), n.prepend(E), o = () => {
              E.remove(), n.removeEventListener("input", o), o = null;
            }, n.addEventListener("input", o);
          }
          const a = (E) => {
            const R = E ? "value" : "textContent", {
              options: k,
              multiple: D
            } = n;
            return D ? Array.prototype.filter.call(k, (I) => I.selected).map((I) => I[R]) : k.selectedIndex === -1 ? null : k[k.selectedIndex][R];
          };
          let u = a(!1);
          const v = (E) => {
            const R = E.target.options;
            return Array.prototype.map.call(R, (k) => ({
              displayValue: k.textContent,
              exportValue: k.value
            }));
          };
          return this.enableScripting && this.hasJSActions ? (n.addEventListener("updatefromsandbox", (E) => {
            const R = {
              value(k) {
                o?.();
                const D = k.detail.value, I = new Set(Array.isArray(D) ? D : [D]);
                for (const F of n.options)
                  F.selected = I.has(F.value);
                b.setValue(l, {
                  value: a(!0)
                }), u = a(!1);
              },
              multipleSelection(k) {
                n.multiple = !0;
              },
              remove(k) {
                const D = n.options, I = k.detail.remove;
                D[I].selected = !1, n.remove(I), D.length > 0 && Array.prototype.findIndex.call(D, (T) => T.selected) === -1 && (D[0].selected = !0), b.setValue(l, {
                  value: a(!0),
                  items: v(k)
                }), u = a(!1);
              },
              clear(k) {
                for (; n.length !== 0; )
                  n.remove(0);
                b.setValue(l, {
                  value: null,
                  items: []
                }), u = a(!1);
              },
              insert(k) {
                const {
                  index: D,
                  displayValue: I,
                  exportValue: F
                } = k.detail.insert, T = n.children[D], X = document.createElement("option");
                X.textContent = I, X.value = F, T ? T.before(X) : n.append(X), b.setValue(l, {
                  value: a(!0),
                  items: v(k)
                }), u = a(!1);
              },
              items(k) {
                const {
                  items: D
                } = k.detail;
                for (; n.length !== 0; )
                  n.remove(0);
                for (const I of D) {
                  const {
                    displayValue: F,
                    exportValue: T
                  } = I, X = document.createElement("option");
                  X.textContent = F, X.value = T, n.append(X);
                }
                n.options.length > 0 && (n.options[0].selected = !0), b.setValue(l, {
                  value: a(!0),
                  items: v(k)
                }), u = a(!1);
              },
              indices(k) {
                const D = new Set(k.detail.indices);
                for (const I of k.target.options)
                  I.selected = D.has(I.index);
                b.setValue(l, {
                  value: a(!0)
                }), u = a(!1);
              },
              editable(k) {
                k.target.disabled = !k.detail.editable;
              }
            };
            this._dispatchEventFromSandbox(R, E);
          }), n.addEventListener("input", (E) => {
            const R = a(!0), k = a(!1);
            b.setValue(l, {
              value: R
            }), E.preventDefault(), this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id: l,
                name: "Keystroke",
                value: u,
                change: k,
                changeEx: R,
                willCommit: !1,
                commitKey: 1,
                keyDown: !1
              }
            });
          }), this._setEventListeners(n, null, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"], ["input", "Validate"]], (E) => E.target.value)) : n.addEventListener("input", function(E) {
            b.setValue(l, {
              value: a(!0)
            });
          }), this.data.combo && this._setTextStyle(n), this._setBackgroundColor(n), this._setDefaultPropertiesFromJS(n), this.container.append(n), this.container;
        }
      }
      class O extends s {
        constructor(b) {
          const {
            data: l,
            elements: e
          } = b;
          super(b, {
            isRenderable: s._hasPopupData(l)
          }), this.elements = e;
        }
        render() {
          this.container.classList.add("popupAnnotation");
          const b = new _({
            container: this.container,
            color: this.data.color,
            titleObj: this.data.titleObj,
            modificationDate: this.data.modificationDate,
            contentsObj: this.data.contentsObj,
            richText: this.data.richText,
            rect: this.data.rect,
            parentRect: this.data.parentRect || null,
            parent: this.parent,
            elements: this.elements,
            open: this.data.open
          }), l = [];
          for (const e of this.elements)
            e.popup = b, l.push(e.data.id), e.addHighlightArea();
          return this.container.setAttribute("aria-controls", l.map((e) => `${y.AnnotationPrefix}${e}`).join(",")), this.container;
        }
      }
      class _ {
        #t = this.#m.bind(this);
        #e = this.#C.bind(this);
        #s = this.#w.bind(this);
        #n = this.#v.bind(this);
        #r = null;
        #i = null;
        #a = null;
        #l = null;
        #h = null;
        #d = null;
        #u = null;
        #c = !1;
        #o = null;
        #p = null;
        #g = null;
        #f = null;
        #A = !1;
        constructor({
          container: b,
          color: l,
          elements: e,
          titleObj: n,
          modificationDate: p,
          contentsObj: o,
          richText: a,
          parent: u,
          rect: v,
          parentRect: E,
          open: R
        }) {
          this.#i = b, this.#f = n, this.#a = o, this.#g = a, this.#d = u, this.#r = l, this.#p = v, this.#u = E, this.#h = e, this.#l = B.PDFDateString.toDateObject(p), this.trigger = e.flatMap((k) => k.getElementsToTriggerPopup());
          for (const k of this.trigger)
            k.addEventListener("click", this.#n), k.addEventListener("mouseenter", this.#s), k.addEventListener("mouseleave", this.#e), k.classList.add("popupTriggerArea");
          for (const k of e)
            k.container?.addEventListener("keydown", this.#t);
          this.#i.hidden = !0, R && this.#v();
        }
        render() {
          if (this.#o)
            return;
          const {
            page: {
              view: b
            },
            viewport: {
              rawDims: {
                pageWidth: l,
                pageHeight: e,
                pageX: n,
                pageY: p
              }
            }
          } = this.#d, o = this.#o = document.createElement("div");
          if (o.className = "popup", this.#r) {
            const $ = o.style.outlineColor = y.Util.makeHexColor(...this.#r);
            CSS.supports("background-color", "color-mix(in srgb, red 30%, white)") ? o.style.backgroundColor = `color-mix(in srgb, ${$} 30%, white)` : o.style.backgroundColor = y.Util.makeHexColor(...this.#r.map((rt) => Math.floor(0.7 * (255 - rt) + rt)));
          }
          const a = document.createElement("span");
          a.className = "header";
          const u = document.createElement("h1");
          if (a.append(u), {
            dir: u.dir,
            str: u.textContent
          } = this.#f, o.append(a), this.#l) {
            const $ = document.createElement("span");
            $.classList.add("popupDate"), $.setAttribute("data-l10n-id", "pdfjs-annotation-date-string"), $.setAttribute("data-l10n-args", JSON.stringify({
              date: this.#l.toLocaleDateString(),
              time: this.#l.toLocaleTimeString()
            })), a.append($);
          }
          const v = this.#a, E = this.#g;
          if (E?.str && (!v?.str || v.str === E.str))
            x.XfaLayer.render({
              xfaHtml: E.html,
              intent: "richText",
              div: o
            }), o.lastChild.classList.add("richText", "popupContent");
          else {
            const $ = this._formatContents(v);
            o.append($);
          }
          let R = !!this.#u, k = R ? this.#u : this.#p;
          for (const $ of this.#h)
            if (!k || y.Util.intersect($.data.rect, k) !== null) {
              k = $.data.rect, R = !0;
              break;
            }
          const D = y.Util.normalizeRect([k[0], b[3] - k[1] + b[1], k[2], b[3] - k[3] + b[1]]), F = R ? k[2] - k[0] + 5 : 0, T = D[0] + F, X = D[1], {
            style: Q
          } = this.#i;
          Q.left = `${100 * (T - n) / l}%`, Q.top = `${100 * (X - p) / e}%`, this.#i.append(o);
        }
        _formatContents({
          str: b,
          dir: l
        }) {
          const e = document.createElement("p");
          e.classList.add("popupContent"), e.dir = l;
          const n = b.split(/(?:\r\n?|\n)/);
          for (let p = 0, o = n.length; p < o; ++p) {
            const a = n[p];
            e.append(document.createTextNode(a)), p < o - 1 && e.append(document.createElement("br"));
          }
          return e;
        }
        #m(b) {
          b.altKey || b.shiftKey || b.ctrlKey || b.metaKey || (b.key === "Enter" || b.key === "Escape" && this.#c) && this.#v();
        }
        #v() {
          this.#c = !this.#c, this.#c ? (this.#w(), this.#i.addEventListener("click", this.#n), this.#i.addEventListener("keydown", this.#t)) : (this.#C(), this.#i.removeEventListener("click", this.#n), this.#i.removeEventListener("keydown", this.#t));
        }
        #w() {
          this.#o || this.render(), this.isVisible ? this.#c && this.#i.classList.add("focused") : (this.#i.hidden = !1, this.#i.style.zIndex = parseInt(this.#i.style.zIndex) + 1e3);
        }
        #C() {
          this.#i.classList.remove("focused"), !(this.#c || !this.isVisible) && (this.#i.hidden = !0, this.#i.style.zIndex = parseInt(this.#i.style.zIndex) - 1e3);
        }
        forceHide() {
          this.#A = this.isVisible, this.#A && (this.#i.hidden = !0);
        }
        maybeShow() {
          this.#A && (this.#A = !1, this.#i.hidden = !1);
        }
        get isVisible() {
          return this.#i.hidden === !1;
        }
      }
      class z extends s {
        constructor(b) {
          super(b, {
            isRenderable: !0,
            ignoreBorder: !0
          }), this.textContent = b.data.textContent, this.textPosition = b.data.textPosition, this.annotationEditorType = y.AnnotationEditorType.FREETEXT;
        }
        render() {
          if (this.container.classList.add("freeTextAnnotation"), this.textContent) {
            const b = document.createElement("div");
            b.classList.add("annotationTextContent"), b.setAttribute("role", "comment");
            for (const l of this.textContent) {
              const e = document.createElement("span");
              e.textContent = l, b.append(e);
            }
            this.container.append(b);
          }
          return !this.data.popupRef && this.hasPopupData && this._createPopup(), this._editOnDoubleClick(), this.container;
        }
        get _isEditable() {
          return this.data.hasOwnCanvas;
        }
      }
      class K extends s {
        #t = null;
        constructor(b) {
          super(b, {
            isRenderable: !0,
            ignoreBorder: !0
          });
        }
        render() {
          this.container.classList.add("lineAnnotation");
          const b = this.data, {
            width: l,
            height: e
          } = c(b.rect), n = this.svgFactory.create(l, e, !0), p = this.#t = this.svgFactory.createElement("svg:line");
          return p.setAttribute("x1", b.rect[2] - b.lineCoordinates[0]), p.setAttribute("y1", b.rect[3] - b.lineCoordinates[1]), p.setAttribute("x2", b.rect[2] - b.lineCoordinates[2]), p.setAttribute("y2", b.rect[3] - b.lineCoordinates[3]), p.setAttribute("stroke-width", b.borderStyle.width || 1), p.setAttribute("stroke", "transparent"), p.setAttribute("fill", "transparent"), n.append(p), this.container.append(n), !b.popupRef && this.hasPopupData && this._createPopup(), this.container;
        }
        getElementsToTriggerPopup() {
          return this.#t;
        }
        addHighlightArea() {
          this.container.classList.add("highlightArea");
        }
      }
      class nt extends s {
        #t = null;
        constructor(b) {
          super(b, {
            isRenderable: !0,
            ignoreBorder: !0
          });
        }
        render() {
          this.container.classList.add("squareAnnotation");
          const b = this.data, {
            width: l,
            height: e
          } = c(b.rect), n = this.svgFactory.create(l, e, !0), p = b.borderStyle.width, o = this.#t = this.svgFactory.createElement("svg:rect");
          return o.setAttribute("x", p / 2), o.setAttribute("y", p / 2), o.setAttribute("width", l - p), o.setAttribute("height", e - p), o.setAttribute("stroke-width", p || 1), o.setAttribute("stroke", "transparent"), o.setAttribute("fill", "transparent"), n.append(o), this.container.append(n), !b.popupRef && this.hasPopupData && this._createPopup(), this.container;
        }
        getElementsToTriggerPopup() {
          return this.#t;
        }
        addHighlightArea() {
          this.container.classList.add("highlightArea");
        }
      }
      class j extends s {
        #t = null;
        constructor(b) {
          super(b, {
            isRenderable: !0,
            ignoreBorder: !0
          });
        }
        render() {
          this.container.classList.add("circleAnnotation");
          const b = this.data, {
            width: l,
            height: e
          } = c(b.rect), n = this.svgFactory.create(l, e, !0), p = b.borderStyle.width, o = this.#t = this.svgFactory.createElement("svg:ellipse");
          return o.setAttribute("cx", l / 2), o.setAttribute("cy", e / 2), o.setAttribute("rx", l / 2 - p / 2), o.setAttribute("ry", e / 2 - p / 2), o.setAttribute("stroke-width", p || 1), o.setAttribute("stroke", "transparent"), o.setAttribute("fill", "transparent"), n.append(o), this.container.append(n), !b.popupRef && this.hasPopupData && this._createPopup(), this.container;
        }
        getElementsToTriggerPopup() {
          return this.#t;
        }
        addHighlightArea() {
          this.container.classList.add("highlightArea");
        }
      }
      class H extends s {
        #t = null;
        constructor(b) {
          super(b, {
            isRenderable: !0,
            ignoreBorder: !0
          }), this.containerClassName = "polylineAnnotation", this.svgElementName = "svg:polyline";
        }
        render() {
          this.container.classList.add(this.containerClassName);
          const b = this.data, {
            width: l,
            height: e
          } = c(b.rect), n = this.svgFactory.create(l, e, !0);
          let p = [];
          for (const a of b.vertices) {
            const u = a.x - b.rect[0], v = b.rect[3] - a.y;
            p.push(u + "," + v);
          }
          p = p.join(" ");
          const o = this.#t = this.svgFactory.createElement(this.svgElementName);
          return o.setAttribute("points", p), o.setAttribute("stroke-width", b.borderStyle.width || 1), o.setAttribute("stroke", "transparent"), o.setAttribute("fill", "transparent"), n.append(o), this.container.append(n), !b.popupRef && this.hasPopupData && this._createPopup(), this.container;
        }
        getElementsToTriggerPopup() {
          return this.#t;
        }
        addHighlightArea() {
          this.container.classList.add("highlightArea");
        }
      }
      class G extends H {
        constructor(b) {
          super(b), this.containerClassName = "polygonAnnotation", this.svgElementName = "svg:polygon";
        }
      }
      class Y extends s {
        constructor(b) {
          super(b, {
            isRenderable: !0,
            ignoreBorder: !0
          });
        }
        render() {
          return this.container.classList.add("caretAnnotation"), !this.data.popupRef && this.hasPopupData && this._createPopup(), this.container;
        }
      }
      class et extends s {
        #t = [];
        constructor(b) {
          super(b, {
            isRenderable: !0,
            ignoreBorder: !0
          }), this.containerClassName = "inkAnnotation", this.svgElementName = "svg:polyline", this.annotationEditorType = y.AnnotationEditorType.INK;
        }
        render() {
          this.container.classList.add(this.containerClassName);
          const b = this.data, {
            width: l,
            height: e
          } = c(b.rect), n = this.svgFactory.create(l, e, !0);
          for (const p of b.inkLists) {
            let o = [];
            for (const u of p) {
              const v = u.x - b.rect[0], E = b.rect[3] - u.y;
              o.push(`${v},${E}`);
            }
            o = o.join(" ");
            const a = this.svgFactory.createElement(this.svgElementName);
            this.#t.push(a), a.setAttribute("points", o), a.setAttribute("stroke-width", b.borderStyle.width || 1), a.setAttribute("stroke", "transparent"), a.setAttribute("fill", "transparent"), !b.popupRef && this.hasPopupData && this._createPopup(), n.append(a);
          }
          return this.container.append(n), this.container;
        }
        getElementsToTriggerPopup() {
          return this.#t;
        }
        addHighlightArea() {
          this.container.classList.add("highlightArea");
        }
      }
      class tt extends s {
        constructor(b) {
          super(b, {
            isRenderable: !0,
            ignoreBorder: !0,
            createQuadrilaterals: !0
          });
        }
        render() {
          return !this.data.popupRef && this.hasPopupData && this._createPopup(), this.container.classList.add("highlightAnnotation"), this.container;
        }
      }
      class ot extends s {
        constructor(b) {
          super(b, {
            isRenderable: !0,
            ignoreBorder: !0,
            createQuadrilaterals: !0
          });
        }
        render() {
          return !this.data.popupRef && this.hasPopupData && this._createPopup(), this.container.classList.add("underlineAnnotation"), this.container;
        }
      }
      class ct extends s {
        constructor(b) {
          super(b, {
            isRenderable: !0,
            ignoreBorder: !0,
            createQuadrilaterals: !0
          });
        }
        render() {
          return !this.data.popupRef && this.hasPopupData && this._createPopup(), this.container.classList.add("squigglyAnnotation"), this.container;
        }
      }
      class pt extends s {
        constructor(b) {
          super(b, {
            isRenderable: !0,
            ignoreBorder: !0,
            createQuadrilaterals: !0
          });
        }
        render() {
          return !this.data.popupRef && this.hasPopupData && this._createPopup(), this.container.classList.add("strikeoutAnnotation"), this.container;
        }
      }
      class dt extends s {
        constructor(b) {
          super(b, {
            isRenderable: !0,
            ignoreBorder: !0
          });
        }
        render() {
          return this.container.classList.add("stampAnnotation"), !this.data.popupRef && this.hasPopupData && this._createPopup(), this.container;
        }
      }
      class ht extends s {
        #t = null;
        constructor(b) {
          super(b, {
            isRenderable: !0
          });
          const {
            filename: l,
            content: e
          } = this.data.file;
          this.filename = (0, B.getFilenameFromUrl)(l, !0), this.content = e, this.linkService.eventBus?.dispatch("fileattachmentannotation", {
            source: this,
            filename: l,
            content: e
          });
        }
        render() {
          this.container.classList.add("fileAttachmentAnnotation");
          const {
            container: b,
            data: l
          } = this;
          let e;
          l.hasAppearance || l.fillAlpha === 0 ? e = document.createElement("div") : (e = document.createElement("img"), e.src = `${this.imageResourcesPath}annotation-${/paperclip/i.test(l.name) ? "paperclip" : "pushpin"}.svg`, l.fillAlpha && l.fillAlpha < 1 && (e.style = `filter: opacity(${Math.round(l.fillAlpha * 100)}%);`)), e.addEventListener("dblclick", this.#e.bind(this)), this.#t = e;
          const {
            isMac: n
          } = y.FeatureTest.platform;
          return b.addEventListener("keydown", (p) => {
            p.key === "Enter" && (n ? p.metaKey : p.ctrlKey) && this.#e();
          }), !l.popupRef && this.hasPopupData ? this._createPopup() : e.classList.add("popupTriggerArea"), b.append(e), b;
        }
        getElementsToTriggerPopup() {
          return this.#t;
        }
        addHighlightArea() {
          this.container.classList.add("highlightArea");
        }
        #e() {
          this.downloadManager?.openOrDownloadData(this.content, this.filename);
        }
      }
      class ut {
        #t = null;
        #e = null;
        #s = /* @__PURE__ */ new Map();
        constructor({
          div: b,
          accessibilityManager: l,
          annotationCanvasMap: e,
          annotationEditorUIManager: n,
          page: p,
          viewport: o
        }) {
          this.div = b, this.#t = l, this.#e = e, this.page = p, this.viewport = o, this.zIndex = 0, this._annotationEditorUIManager = n;
        }
        #n(b, l) {
          const e = b.firstChild || b;
          e.id = `${y.AnnotationPrefix}${l}`, this.div.append(b), this.#t?.moveElementInDOM(this.div, b, e, !1);
        }
        async render(b) {
          const {
            annotations: l
          } = b, e = this.div;
          (0, B.setLayerDimensions)(e, this.viewport);
          const n = /* @__PURE__ */ new Map(), p = {
            data: null,
            layer: e,
            linkService: b.linkService,
            downloadManager: b.downloadManager,
            imageResourcesPath: b.imageResourcesPath || "",
            renderForms: b.renderForms !== !1,
            svgFactory: new B.DOMSVGFactory(),
            annotationStorage: b.annotationStorage || new N.AnnotationStorage(),
            enableScripting: b.enableScripting === !0,
            hasJSActions: b.hasJSActions,
            fieldObjects: b.fieldObjects,
            parent: this,
            elements: null
          };
          for (const o of l) {
            if (o.noHTML)
              continue;
            const a = o.annotationType === y.AnnotationType.POPUP;
            if (a) {
              const E = n.get(o.id);
              if (!E)
                continue;
              p.elements = E;
            } else {
              const {
                width: E,
                height: R
              } = c(o.rect);
              if (E <= 0 || R <= 0)
                continue;
            }
            p.data = o;
            const u = m.create(p);
            if (!u.isRenderable)
              continue;
            if (!a && o.popupRef) {
              const E = n.get(o.popupRef);
              E ? E.push(u) : n.set(o.popupRef, [u]);
            }
            const v = u.render();
            o.hidden && (v.style.visibility = "hidden"), this.#n(v, o.id), u.annotationEditorType > 0 && (this.#s.set(u.data.id, u), this._annotationEditorUIManager?.renderAnnotationElement(u));
          }
          this.#r();
        }
        update({
          viewport: b
        }) {
          const l = this.div;
          this.viewport = b, (0, B.setLayerDimensions)(l, {
            rotation: b.rotation
          }), this.#r(), l.hidden = !1;
        }
        #r() {
          if (!this.#e)
            return;
          const b = this.div;
          for (const [l, e] of this.#e) {
            const n = b.querySelector(`[data-annotation-id="${l}"]`);
            if (!n)
              continue;
            e.className = "annotationContent";
            const {
              firstChild: p
            } = n;
            p ? p.nodeName === "CANVAS" ? p.replaceWith(e) : p.classList.contains("annotationContent") ? p.after(e) : p.before(e) : n.append(e);
          }
          this.#e.clear();
        }
        getEditableAnnotations() {
          return Array.from(this.#s.values());
        }
        getEditableAnnotation(b) {
          return this.#s.get(b);
        }
      }
    }
  ),
  /***/
  792: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        AnnotationStorage: () => (
          /* binding */
          L
        ),
        /* harmony export */
        PrintAnnotationStorage: () => (
          /* binding */
          C
        ),
        /* harmony export */
        SerializableEmpty: () => (
          /* binding */
          U
        )
        /* harmony export */
      });
      var y = V(292), B = V(310), N = V(651);
      const U = Object.freeze({
        map: null,
        hash: "",
        transfer: void 0
      });
      class L {
        #t = !1;
        #e = /* @__PURE__ */ new Map();
        constructor() {
          this.onSetModified = null, this.onResetModified = null, this.onAnnotationEditor = null;
        }
        getValue(A, r) {
          const d = this.#e.get(A);
          return d === void 0 ? r : Object.assign(r, d);
        }
        getRawValue(A) {
          return this.#e.get(A);
        }
        remove(A) {
          if (this.#e.delete(A), this.#e.size === 0 && this.resetModified(), typeof this.onAnnotationEditor == "function") {
            for (const r of this.#e.values())
              if (r instanceof B.AnnotationEditor)
                return;
            this.onAnnotationEditor(null);
          }
        }
        setValue(A, r) {
          const d = this.#e.get(A);
          let c = !1;
          if (d !== void 0)
            for (const [m, s] of Object.entries(r))
              d[m] !== s && (c = !0, d[m] = s);
          else
            c = !0, this.#e.set(A, r);
          c && this.#s(), r instanceof B.AnnotationEditor && typeof this.onAnnotationEditor == "function" && this.onAnnotationEditor(r.constructor._type);
        }
        has(A) {
          return this.#e.has(A);
        }
        getAll() {
          return this.#e.size > 0 ? (0, y.objectFromMap)(this.#e) : null;
        }
        setAll(A) {
          for (const [r, d] of Object.entries(A))
            this.setValue(r, d);
        }
        get size() {
          return this.#e.size;
        }
        #s() {
          this.#t || (this.#t = !0, typeof this.onSetModified == "function" && this.onSetModified());
        }
        resetModified() {
          this.#t && (this.#t = !1, typeof this.onResetModified == "function" && this.onResetModified());
        }
        get print() {
          return new C(this);
        }
        get serializable() {
          if (this.#e.size === 0)
            return U;
          const A = /* @__PURE__ */ new Map(), r = new N.MurmurHash3_64(), d = [], c = /* @__PURE__ */ Object.create(null);
          let m = !1;
          for (const [s, g] of this.#e) {
            const t = g instanceof B.AnnotationEditor ? g.serialize(!1, c) : g;
            t && (A.set(s, t), r.update(`${s}:${JSON.stringify(t)}`), m ||= !!t.bitmap);
          }
          if (m)
            for (const s of A.values())
              s.bitmap && d.push(s.bitmap);
          return A.size > 0 ? {
            map: A,
            hash: r.hexdigest(),
            transfer: d
          } : U;
        }
        get editorStats() {
          let A = null;
          const r = /* @__PURE__ */ new Map();
          for (const d of this.#e.values()) {
            if (!(d instanceof B.AnnotationEditor))
              continue;
            const c = d.telemetryFinalData;
            if (!c)
              continue;
            const {
              type: m
            } = c;
            r.has(m) || r.set(m, Object.getPrototypeOf(d).constructor), A ||= /* @__PURE__ */ Object.create(null);
            const s = A[m] ||= /* @__PURE__ */ new Map();
            for (const [g, t] of Object.entries(c)) {
              if (g === "type")
                continue;
              let i = s.get(g);
              i || (i = /* @__PURE__ */ new Map(), s.set(g, i));
              const h = i.get(t) ?? 0;
              i.set(t, h + 1);
            }
          }
          for (const [d, c] of r)
            A[d] = c.computeTelemetryFinalData(A[d]);
          return A;
        }
      }
      class C extends L {
        #t;
        constructor(A) {
          super();
          const {
            map: r,
            hash: d,
            transfer: c
          } = A.serializable, m = structuredClone(r, c ? {
            transfer: c
          } : null);
          this.#t = {
            map: m,
            hash: d,
            transfer: c
          };
        }
        get print() {
          (0, y.unreachable)("Should not call PrintAnnotationStorage.print");
        }
        get serializable() {
          return this.#t;
        }
      }
    }
  ),
  /***/
  831: (
    /***/
    (at, W, V) => {
      V.a(at, async (y, B) => {
        try {
          let nt = function(o) {
            if (typeof o == "string" || o instanceof URL ? o = {
              url: o
            } : (o instanceof ArrayBuffer || ArrayBuffer.isView(o)) && (o = {
              data: o
            }), typeof o != "object")
              throw new Error("Invalid parameter in getDocument, need parameter object.");
            if (!o.url && !o.data && !o.range)
              throw new Error("Invalid parameter object: need either .data, .range or .url");
            const a = new et(), {
              docId: u
            } = a, v = o.url ? H(o.url) : null, E = o.data ? G(o.data) : null, R = o.httpHeaders || null, k = o.withCredentials === !0, D = o.password ?? null, I = o.range instanceof tt ? o.range : null, F = Number.isInteger(o.rangeChunkSize) && o.rangeChunkSize > 0 ? o.rangeChunkSize : S;
            let T = o.worker instanceof ht ? o.worker : null;
            const X = o.verbosity, Q = typeof o.docBaseUrl == "string" && !(0, L.isDataScheme)(o.docBaseUrl) ? o.docBaseUrl : null, $ = typeof o.cMapUrl == "string" ? o.cMapUrl : null, q = o.cMapPacked !== !1, rt = o.CMapReaderFactory || _, Z = typeof o.standardFontDataUrl == "string" ? o.standardFontDataUrl : null, J = o.StandardFontDataFactory || K, it = o.stopAtErrors !== !0, lt = Number.isInteger(o.maxImageSize) && o.maxImageSize > -1 ? o.maxImageSize : -1, gt = o.isEvalSupported !== !1, bt = typeof o.isOffscreenCanvasSupported == "boolean" ? o.isOffscreenCanvasSupported : !N.isNodeJS, At = Number.isInteger(o.canvasMaxAreaInBytes) ? o.canvasMaxAreaInBytes : -1, mt = typeof o.disableFontFace == "boolean" ? o.disableFontFace : N.isNodeJS, Ct = o.fontExtraProperties === !0, St = o.enableXfa === !0, Tt = o.ownerDocument || globalThis.document, vt = o.disableRange === !0, Et = o.disableStream === !0, Rt = o.disableAutoFetch === !0, Lt = o.pdfBug === !0, Nt = I ? I.length : o.length ?? NaN, Ht = typeof o.useSystemFonts == "boolean" ? o.useSystemFonts : !N.isNodeJS && !mt, Pt = typeof o.useWorkerFetch == "boolean" ? o.useWorkerFetch : rt === L.DOMCMapReaderFactory && J === L.DOMStandardFontDataFactory && $ && Z && (0, L.isValidFetchUrl)($, document.baseURI) && (0, L.isValidFetchUrl)(Z, document.baseURI), xt = o.canvasFactory || new O({
              ownerDocument: Tt
            }), wt = o.filterFactory || new z({
              docId: u,
              ownerDocument: Tt
            }), Bt = null;
            (0, N.setVerbosityLevel)(X);
            const Dt = {
              canvasFactory: xt,
              filterFactory: wt
            };
            if (Pt || (Dt.cMapReaderFactory = new rt({
              baseUrl: $,
              isCompressed: q
            }), Dt.standardFontDataFactory = new J({
              baseUrl: Z
            })), !T) {
              const Ot = {
                verbosity: X,
                port: d.GlobalWorkerOptions.workerPort
              };
              T = Ot.port ? ht.fromPort(Ot) : new ht(Ot), a._worker = T;
            }
            const Mt = {
              docId: u,
              apiVersion: "4.2.67",
              data: E,
              password: D,
              disableAutoFetch: Rt,
              rangeChunkSize: F,
              length: Nt,
              docBaseUrl: Q,
              enableXfa: St,
              evaluatorOptions: {
                maxImageSize: lt,
                disableFontFace: mt,
                ignoreErrors: it,
                isEvalSupported: gt,
                isOffscreenCanvasSupported: bt,
                canvasMaxAreaInBytes: At,
                fontExtraProperties: Ct,
                useSystemFonts: Ht,
                cMapUrl: Pt ? $ : null,
                standardFontDataUrl: Pt ? Z : null
              }
            }, yt = {
              ignoreErrors: it,
              disableFontFace: mt,
              fontExtraProperties: Ct,
              enableXfa: St,
              ownerDocument: Tt,
              disableAutoFetch: Rt,
              pdfBug: Lt,
              styleElement: Bt
            };
            return T.promise.then(function() {
              if (a.destroyed)
                throw new Error("Loading aborted");
              const Ot = j(T, Mt), qt = new Promise(function(Gt) {
                let _t;
                I ? _t = new g.PDFDataTransportStream(I, {
                  disableRange: vt,
                  disableStream: Et
                }) : E || (_t = ((kt) => N.isNodeJS ? function() {
                  return typeof fetch < "u" && typeof Response < "u" && "body" in Response.prototype;
                }() && (0, L.isValidFetchUrl)(kt.url) ? new t.PDFFetchStream(kt) : new h.PDFNodeStream(kt) : (0, L.isValidFetchUrl)(kt.url) ? new t.PDFFetchStream(kt) : new i.PDFNetworkStream(kt))({
                  url: v,
                  length: Nt,
                  httpHeaders: R,
                  withCredentials: k,
                  rangeChunkSize: F,
                  disableRange: vt,
                  disableStream: Et
                })), Gt(_t);
              });
              return Promise.all([Ot, qt]).then(function([Gt, _t]) {
                if (a.destroyed)
                  throw new Error("Loading aborted");
                const Vt = new c.MessageHandler(u, Gt, T.port), kt = new ut(Vt, a, _t, yt, Dt);
                a._transport = kt, Vt.send("Ready", null);
              });
            }).catch(a._capability.reject), a;
          }, H = function(o) {
            if (o instanceof URL)
              return o.href;
            try {
              return new URL(o, window.location).href;
            } catch {
              if (N.isNodeJS && typeof o == "string")
                return o;
            }
            throw new Error("Invalid PDF url data: either string or URL-object is expected in the url property.");
          }, G = function(o) {
            if (N.isNodeJS && typeof Buffer < "u" && o instanceof Buffer)
              throw new Error("Please provide binary data as `Uint8Array`, rather than `Buffer`.");
            if (o instanceof Uint8Array && o.byteLength === o.buffer.byteLength)
              return o;
            if (typeof o == "string")
              return (0, N.stringToBytes)(o);
            if (o instanceof ArrayBuffer || ArrayBuffer.isView(o) || typeof o == "object" && !isNaN(o?.length))
              return new Uint8Array(o);
            throw new Error("Invalid PDF binary data: either TypedArray, string, or array-like object is expected in the data property.");
          }, Y = function(o) {
            return typeof o == "object" && Number.isInteger(o?.num) && o.num >= 0 && Number.isInteger(o?.gen) && o.gen >= 0;
          };
          V.d(W, {
            /* harmony export */
            PDFDataRangeTransport: () => (
              /* binding */
              tt
            ),
            /* harmony export */
            PDFWorker: () => (
              /* binding */
              ht
            ),
            /* harmony export */
            build: () => (
              /* binding */
              p
            ),
            /* harmony export */
            getDocument: () => (
              /* binding */
              nt
            ),
            /* harmony export */
            version: () => (
              /* binding */
              n
            )
            /* harmony export */
          });
          var N = V(292), U = V(792), L = V(419), C = V(10), x = V(573), A = V(923), r = V(814), d = V(164), c = V(178), m = V(62), s = V(626), g = V(585), t = V(94), i = V(457), h = V(786), f = V(50), w = y([x, h]);
          [x, h] = w.then ? (await w)() : w;
          const S = 65536, P = 100, M = 5e3, O = N.isNodeJS ? x.NodeCanvasFactory : L.DOMCanvasFactory, _ = N.isNodeJS ? x.NodeCMapReaderFactory : L.DOMCMapReaderFactory, z = N.isNodeJS ? x.NodeFilterFactory : L.DOMFilterFactory, K = N.isNodeJS ? x.NodeStandardFontDataFactory : L.DOMStandardFontDataFactory;
          async function j(o, a) {
            if (o.destroyed)
              throw new Error("Worker was destroyed");
            const u = await o.messageHandler.sendWithPromise("GetDocRequest", a, a.data ? [a.data.buffer] : null);
            if (o.destroyed)
              throw new Error("Worker was destroyed");
            return u;
          }
          class et {
            static #t = 0;
            constructor() {
              this._capability = Promise.withResolvers(), this._transport = null, this._worker = null, this.docId = `d${et.#t++}`, this.destroyed = !1, this.onPassword = null, this.onProgress = null;
            }
            get promise() {
              return this._capability.promise;
            }
            async destroy() {
              this.destroyed = !0;
              try {
                this._worker?.port && (this._worker._pendingDestroy = !0), await this._transport?.destroy();
              } catch (a) {
                throw this._worker?.port && delete this._worker._pendingDestroy, a;
              }
              this._transport = null, this._worker && (this._worker.destroy(), this._worker = null);
            }
          }
          class tt {
            constructor(a, u, v = !1, E = null) {
              this.length = a, this.initialData = u, this.progressiveDone = v, this.contentDispositionFilename = E, this._rangeListeners = [], this._progressListeners = [], this._progressiveReadListeners = [], this._progressiveDoneListeners = [], this._readyCapability = Promise.withResolvers();
            }
            addRangeListener(a) {
              this._rangeListeners.push(a);
            }
            addProgressListener(a) {
              this._progressListeners.push(a);
            }
            addProgressiveReadListener(a) {
              this._progressiveReadListeners.push(a);
            }
            addProgressiveDoneListener(a) {
              this._progressiveDoneListeners.push(a);
            }
            onDataRange(a, u) {
              for (const v of this._rangeListeners)
                v(a, u);
            }
            onDataProgress(a, u) {
              this._readyCapability.promise.then(() => {
                for (const v of this._progressListeners)
                  v(a, u);
              });
            }
            onDataProgressiveRead(a) {
              this._readyCapability.promise.then(() => {
                for (const u of this._progressiveReadListeners)
                  u(a);
              });
            }
            onDataProgressiveDone() {
              this._readyCapability.promise.then(() => {
                for (const a of this._progressiveDoneListeners)
                  a();
              });
            }
            transportReady() {
              this._readyCapability.resolve();
            }
            requestDataRange(a, u) {
              (0, N.unreachable)("Abstract method PDFDataRangeTransport.requestDataRange");
            }
            abort() {
            }
          }
          class ot {
            constructor(a, u) {
              this._pdfInfo = a, this._transport = u;
            }
            get annotationStorage() {
              return this._transport.annotationStorage;
            }
            get filterFactory() {
              return this._transport.filterFactory;
            }
            get numPages() {
              return this._pdfInfo.numPages;
            }
            get fingerprints() {
              return this._pdfInfo.fingerprints;
            }
            get isPureXfa() {
              return (0, N.shadow)(this, "isPureXfa", !!this._transport._htmlForXfa);
            }
            get allXfaHtml() {
              return this._transport._htmlForXfa;
            }
            getPage(a) {
              return this._transport.getPage(a);
            }
            getPageIndex(a) {
              return this._transport.getPageIndex(a);
            }
            getDestinations() {
              return this._transport.getDestinations();
            }
            getDestination(a) {
              return this._transport.getDestination(a);
            }
            getPageLabels() {
              return this._transport.getPageLabels();
            }
            getPageLayout() {
              return this._transport.getPageLayout();
            }
            getPageMode() {
              return this._transport.getPageMode();
            }
            getViewerPreferences() {
              return this._transport.getViewerPreferences();
            }
            getOpenAction() {
              return this._transport.getOpenAction();
            }
            getAttachments() {
              return this._transport.getAttachments();
            }
            getJSActions() {
              return this._transport.getDocJSActions();
            }
            getOutline() {
              return this._transport.getOutline();
            }
            getOptionalContentConfig({
              intent: a = "display"
            } = {}) {
              const {
                renderingIntent: u
              } = this._transport.getRenderingIntent(a);
              return this._transport.getOptionalContentConfig(u);
            }
            getPermissions() {
              return this._transport.getPermissions();
            }
            getMetadata() {
              return this._transport.getMetadata();
            }
            getMarkInfo() {
              return this._transport.getMarkInfo();
            }
            getData() {
              return this._transport.getData();
            }
            saveDocument() {
              return this._transport.saveDocument();
            }
            getDownloadInfo() {
              return this._transport.downloadInfoCapability.promise;
            }
            cleanup(a = !1) {
              return this._transport.startCleanup(a || this.isPureXfa);
            }
            destroy() {
              return this.loadingTask.destroy();
            }
            cachedPageNumber(a) {
              return this._transport.cachedPageNumber(a);
            }
            get loadingParams() {
              return this._transport.loadingParams;
            }
            get loadingTask() {
              return this._transport.loadingTask;
            }
            getFieldObjects() {
              return this._transport.getFieldObjects();
            }
            hasJSActions() {
              return this._transport.hasJSActions();
            }
            getCalculationOrderIds() {
              return this._transport.getCalculationOrderIds();
            }
          }
          class ct {
            #t = null;
            #e = !1;
            constructor(a, u, v, E = !1) {
              this._pageIndex = a, this._pageInfo = u, this._transport = v, this._stats = E ? new L.StatTimer() : null, this._pdfBug = E, this.commonObjs = v.commonObjs, this.objs = new b(), this._maybeCleanupAfterRender = !1, this._intentStates = /* @__PURE__ */ new Map(), this.destroyed = !1;
            }
            get pageNumber() {
              return this._pageIndex + 1;
            }
            get rotate() {
              return this._pageInfo.rotate;
            }
            get ref() {
              return this._pageInfo.ref;
            }
            get userUnit() {
              return this._pageInfo.userUnit;
            }
            get view() {
              return this._pageInfo.view;
            }
            getViewport({
              scale: a,
              rotation: u = this.rotate,
              offsetX: v = 0,
              offsetY: E = 0,
              dontFlip: R = !1
            } = {}) {
              return new L.PageViewport({
                viewBox: this.view,
                scale: a,
                rotation: u,
                offsetX: v,
                offsetY: E,
                dontFlip: R
              });
            }
            getAnnotations({
              intent: a = "display"
            } = {}) {
              const {
                renderingIntent: u
              } = this._transport.getRenderingIntent(a);
              return this._transport.getAnnotations(this._pageIndex, u);
            }
            getJSActions() {
              return this._transport.getPageJSActions(this._pageIndex);
            }
            get filterFactory() {
              return this._transport.filterFactory;
            }
            get isPureXfa() {
              return (0, N.shadow)(this, "isPureXfa", !!this._transport._htmlForXfa);
            }
            async getXfa() {
              return this._transport._htmlForXfa?.children[this._pageIndex] || null;
            }
            render({
              canvasContext: a,
              viewport: u,
              intent: v = "display",
              annotationMode: E = N.AnnotationMode.ENABLE,
              transform: R = null,
              background: k = null,
              optionalContentConfigPromise: D = null,
              annotationCanvasMap: I = null,
              pageColors: F = null,
              printAnnotationStorage: T = null
            }) {
              this._stats?.time("Overall");
              const X = this._transport.getRenderingIntent(v, E, T), {
                renderingIntent: Q,
                cacheKey: $
              } = X;
              this.#e = !1, this.#n(), D ||= this._transport.getOptionalContentConfig(Q);
              let q = this._intentStates.get($);
              q || (q = /* @__PURE__ */ Object.create(null), this._intentStates.set($, q)), q.streamReaderCancelTimeout && (clearTimeout(q.streamReaderCancelTimeout), q.streamReaderCancelTimeout = null);
              const rt = !!(Q & N.RenderingIntentFlag.PRINT);
              q.displayReadyCapability || (q.displayReadyCapability = Promise.withResolvers(), q.operatorList = {
                fnArray: [],
                argsArray: [],
                lastChunk: !1,
                separateAnnots: null
              }, this._stats?.time("Page Request"), this._pumpOperatorList(X));
              const Z = (lt) => {
                q.renderTasks.delete(J), (this._maybeCleanupAfterRender || rt) && (this.#e = !0), this.#s(!rt), lt ? (J.capability.reject(lt), this._abortOperatorList({
                  intentState: q,
                  reason: lt instanceof Error ? lt : new Error(lt)
                })) : J.capability.resolve(), this._stats?.timeEnd("Rendering"), this._stats?.timeEnd("Overall");
              }, J = new e({
                callback: Z,
                params: {
                  canvasContext: a,
                  viewport: u,
                  transform: R,
                  background: k
                },
                objs: this.objs,
                commonObjs: this.commonObjs,
                annotationCanvasMap: I,
                operatorList: q.operatorList,
                pageIndex: this._pageIndex,
                canvasFactory: this._transport.canvasFactory,
                filterFactory: this._transport.filterFactory,
                useRequestAnimationFrame: !rt,
                pdfBug: this._pdfBug,
                pageColors: F
              });
              (q.renderTasks ||= /* @__PURE__ */ new Set()).add(J);
              const it = J.task;
              return Promise.all([q.displayReadyCapability.promise, D]).then(([lt, gt]) => {
                if (this.destroyed) {
                  Z();
                  return;
                }
                if (this._stats?.time("Rendering"), !(gt.renderingIntent & Q))
                  throw new Error("Must use the same `intent`-argument when calling the `PDFPageProxy.render` and `PDFDocumentProxy.getOptionalContentConfig` methods.");
                J.initializeGraphics({
                  transparency: lt,
                  optionalContentConfig: gt
                }), J.operatorListChanged();
              }).catch(Z), it;
            }
            getOperatorList({
              intent: a = "display",
              annotationMode: u = N.AnnotationMode.ENABLE,
              printAnnotationStorage: v = null
            } = {}) {
              function E() {
                k.operatorList.lastChunk && (k.opListReadCapability.resolve(k.operatorList), k.renderTasks.delete(D));
              }
              const R = this._transport.getRenderingIntent(a, u, v, !0);
              let k = this._intentStates.get(R.cacheKey);
              k || (k = /* @__PURE__ */ Object.create(null), this._intentStates.set(R.cacheKey, k));
              let D;
              return k.opListReadCapability || (D = /* @__PURE__ */ Object.create(null), D.operatorListChanged = E, k.opListReadCapability = Promise.withResolvers(), (k.renderTasks ||= /* @__PURE__ */ new Set()).add(D), k.operatorList = {
                fnArray: [],
                argsArray: [],
                lastChunk: !1,
                separateAnnots: null
              }, this._stats?.time("Page Request"), this._pumpOperatorList(R)), k.opListReadCapability.promise;
            }
            streamTextContent({
              includeMarkedContent: a = !1,
              disableNormalization: u = !1
            } = {}) {
              return this._transport.messageHandler.sendWithStream("GetTextContent", {
                pageIndex: this._pageIndex,
                includeMarkedContent: a === !0,
                disableNormalization: u === !0
              }, {
                highWaterMark: 100,
                size(E) {
                  return E.items.length;
                }
              });
            }
            getTextContent(a = {}) {
              if (this._transport._htmlForXfa)
                return this.getXfa().then((v) => f.XfaText.textContent(v));
              const u = this.streamTextContent(a);
              return new Promise(function(v, E) {
                function R() {
                  k.read().then(function({
                    value: I,
                    done: F
                  }) {
                    if (F) {
                      v(D);
                      return;
                    }
                    Object.assign(D.styles, I.styles), D.items.push(...I.items), R();
                  }, E);
                }
                const k = u.getReader(), D = {
                  items: [],
                  styles: /* @__PURE__ */ Object.create(null)
                };
                R();
              });
            }
            getStructTree() {
              return this._transport.getStructTree(this._pageIndex);
            }
            _destroy() {
              this.destroyed = !0;
              const a = [];
              for (const u of this._intentStates.values())
                if (this._abortOperatorList({
                  intentState: u,
                  reason: new Error("Page was destroyed."),
                  force: !0
                }), !u.opListReadCapability)
                  for (const v of u.renderTasks)
                    a.push(v.completed), v.cancel();
              return this.objs.clear(), this.#e = !1, this.#n(), Promise.all(a);
            }
            cleanup(a = !1) {
              this.#e = !0;
              const u = this.#s(!1);
              return a && u && (this._stats &&= new L.StatTimer()), u;
            }
            #s(a = !1) {
              if (this.#n(), !this.#e || this.destroyed)
                return !1;
              if (a)
                return this.#t = setTimeout(() => {
                  this.#t = null, this.#s(!1);
                }, M), !1;
              for (const {
                renderTasks: u,
                operatorList: v
              } of this._intentStates.values())
                if (u.size > 0 || !v.lastChunk)
                  return !1;
              return this._intentStates.clear(), this.objs.clear(), this.#e = !1, !0;
            }
            #n() {
              this.#t && (clearTimeout(this.#t), this.#t = null);
            }
            _startRenderPage(a, u) {
              const v = this._intentStates.get(u);
              v && (this._stats?.timeEnd("Page Request"), v.displayReadyCapability?.resolve(a));
            }
            _renderPageChunk(a, u) {
              for (let v = 0, E = a.length; v < E; v++)
                u.operatorList.fnArray.push(a.fnArray[v]), u.operatorList.argsArray.push(a.argsArray[v]);
              u.operatorList.lastChunk = a.lastChunk, u.operatorList.separateAnnots = a.separateAnnots;
              for (const v of u.renderTasks)
                v.operatorListChanged();
              a.lastChunk && this.#s(!0);
            }
            _pumpOperatorList({
              renderingIntent: a,
              cacheKey: u,
              annotationStorageSerializable: v
            }) {
              const {
                map: E,
                transfer: R
              } = v, D = this._transport.messageHandler.sendWithStream("GetOperatorList", {
                pageIndex: this._pageIndex,
                intent: a,
                cacheKey: u,
                annotationStorage: E
              }, R).getReader(), I = this._intentStates.get(u);
              I.streamReader = D;
              const F = () => {
                D.read().then(({
                  value: T,
                  done: X
                }) => {
                  if (X) {
                    I.streamReader = null;
                    return;
                  }
                  this._transport.destroyed || (this._renderPageChunk(T, I), F());
                }, (T) => {
                  if (I.streamReader = null, !this._transport.destroyed) {
                    if (I.operatorList) {
                      I.operatorList.lastChunk = !0;
                      for (const X of I.renderTasks)
                        X.operatorListChanged();
                      this.#s(!0);
                    }
                    if (I.displayReadyCapability)
                      I.displayReadyCapability.reject(T);
                    else if (I.opListReadCapability)
                      I.opListReadCapability.reject(T);
                    else
                      throw T;
                  }
                });
              };
              F();
            }
            _abortOperatorList({
              intentState: a,
              reason: u,
              force: v = !1
            }) {
              if (a.streamReader) {
                if (a.streamReaderCancelTimeout && (clearTimeout(a.streamReaderCancelTimeout), a.streamReaderCancelTimeout = null), !v) {
                  if (a.renderTasks.size > 0)
                    return;
                  if (u instanceof L.RenderingCancelledException) {
                    let E = P;
                    u.extraDelay > 0 && u.extraDelay < 1e3 && (E += u.extraDelay), a.streamReaderCancelTimeout = setTimeout(() => {
                      a.streamReaderCancelTimeout = null, this._abortOperatorList({
                        intentState: a,
                        reason: u,
                        force: !0
                      });
                    }, E);
                    return;
                  }
                }
                if (a.streamReader.cancel(new N.AbortException(u.message)).catch(() => {
                }), a.streamReader = null, !this._transport.destroyed) {
                  for (const [E, R] of this._intentStates)
                    if (R === a) {
                      this._intentStates.delete(E);
                      break;
                    }
                  this.cleanup();
                }
              }
            }
            get stats() {
              return this._stats;
            }
          }
          class pt {
            #t = /* @__PURE__ */ new Set();
            #e = Promise.resolve();
            postMessage(a, u) {
              const v = {
                data: structuredClone(a, u ? {
                  transfer: u
                } : null)
              };
              this.#e.then(() => {
                for (const E of this.#t)
                  E.call(this, v);
              });
            }
            addEventListener(a, u) {
              this.#t.add(u);
            }
            removeEventListener(a, u) {
              this.#t.delete(u);
            }
            terminate() {
              this.#t.clear();
            }
          }
          const dt = {
            isWorkerDisabled: !1,
            fakeWorkerId: 0
          };
          N.isNodeJS && (dt.isWorkerDisabled = !0, d.GlobalWorkerOptions.workerSrc ||= "./pdf.worker.mjs"), dt.isSameOrigin = function(o, a) {
            let u;
            try {
              if (u = new URL(o), !u.origin || u.origin === "null")
                return !1;
            } catch {
              return !1;
            }
            const v = new URL(a, u);
            return u.origin === v.origin;
          }, dt.createCDNWrapper = function(o) {
            const a = `await import("${o}");`;
            return URL.createObjectURL(new Blob([a], {
              type: "text/javascript"
            }));
          };
          class ht {
            static #t;
            constructor({
              name: a = null,
              port: u = null,
              verbosity: v = (0, N.getVerbosityLevel)()
            } = {}) {
              if (this.name = a, this.destroyed = !1, this.verbosity = v, this._readyCapability = Promise.withResolvers(), this._port = null, this._webWorker = null, this._messageHandler = null, u) {
                if (ht.#t?.has(u))
                  throw new Error("Cannot use more than one PDFWorker per port.");
                (ht.#t ||= /* @__PURE__ */ new WeakMap()).set(u, this), this._initializeFromPort(u);
                return;
              }
              this._initialize();
            }
            get promise() {
              return this._readyCapability.promise;
            }
            get port() {
              return this._port;
            }
            get messageHandler() {
              return this._messageHandler;
            }
            _initializeFromPort(a) {
              this._port = a, this._messageHandler = new c.MessageHandler("main", "worker", a), this._messageHandler.on("ready", function() {
              }), this._readyCapability.resolve(), this._messageHandler.send("configure", {
                verbosity: this.verbosity
              });
            }
            _initialize() {
              if (!dt.isWorkerDisabled && !ht.#e) {
                let {
                  workerSrc: a
                } = ht;
                try {
                  dt.isSameOrigin(window.location.href, a) || (a = dt.createCDNWrapper(new URL(a, window.location).href));
                  const u = new Worker(a, {
                    type: "module"
                  }), v = new c.MessageHandler("main", "worker", u), E = () => {
                    u.removeEventListener("error", R), v.destroy(), u.terminate(), this.destroyed ? this._readyCapability.reject(new Error("Worker was destroyed")) : this._setupFakeWorker();
                  }, R = () => {
                    this._webWorker || E();
                  };
                  u.addEventListener("error", R), v.on("test", (D) => {
                    if (u.removeEventListener("error", R), this.destroyed) {
                      E();
                      return;
                    }
                    D ? (this._messageHandler = v, this._port = u, this._webWorker = u, this._readyCapability.resolve(), v.send("configure", {
                      verbosity: this.verbosity
                    })) : (this._setupFakeWorker(), v.destroy(), u.terminate());
                  }), v.on("ready", (D) => {
                    if (u.removeEventListener("error", R), this.destroyed) {
                      E();
                      return;
                    }
                    try {
                      k();
                    } catch {
                      this._setupFakeWorker();
                    }
                  });
                  const k = () => {
                    const D = new Uint8Array();
                    v.send("test", D, [D.buffer]);
                  };
                  k();
                  return;
                } catch {
                  (0, N.info)("The worker has been disabled.");
                }
              }
              this._setupFakeWorker();
            }
            _setupFakeWorker() {
              dt.isWorkerDisabled || ((0, N.warn)("Setting up fake worker."), dt.isWorkerDisabled = !0), ht._setupFakeWorkerGlobal.then((a) => {
                if (this.destroyed) {
                  this._readyCapability.reject(new Error("Worker was destroyed"));
                  return;
                }
                const u = new pt();
                this._port = u;
                const v = `fake${dt.fakeWorkerId++}`, E = new c.MessageHandler(v + "_worker", v, u);
                a.setup(E, u);
                const R = new c.MessageHandler(v, v + "_worker", u);
                this._messageHandler = R, this._readyCapability.resolve(), R.send("configure", {
                  verbosity: this.verbosity
                });
              }).catch((a) => {
                this._readyCapability.reject(new Error(`Setting up fake worker failed: "${a.message}".`));
              });
            }
            destroy() {
              this.destroyed = !0, this._webWorker && (this._webWorker.terminate(), this._webWorker = null), ht.#t?.delete(this._port), this._port = null, this._messageHandler && (this._messageHandler.destroy(), this._messageHandler = null);
            }
            static fromPort(a) {
              if (!a?.port)
                throw new Error("PDFWorker.fromPort - invalid method signature.");
              const u = this.#t?.get(a.port);
              if (u) {
                if (u._pendingDestroy)
                  throw new Error("PDFWorker.fromPort - the worker is being destroyed.\nPlease remember to await `PDFDocumentLoadingTask.destroy()`-calls.");
                return u;
              }
              return new ht(a);
            }
            static get workerSrc() {
              if (d.GlobalWorkerOptions.workerSrc)
                return d.GlobalWorkerOptions.workerSrc;
              throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
            }
            static get #e() {
              try {
                return globalThis.pdfjsWorker?.WorkerMessageHandler || null;
              } catch {
                return null;
              }
            }
            static get _setupFakeWorkerGlobal() {
              const a = async () => this.#e ? this.#e : (await import(
                /*webpackIgnore: true*/
                this.workerSrc
              )).WorkerMessageHandler;
              return (0, N.shadow)(this, "_setupFakeWorkerGlobal", a());
            }
          }
          class ut {
            #t = /* @__PURE__ */ new Map();
            #e = /* @__PURE__ */ new Map();
            #s = /* @__PURE__ */ new Map();
            #n = /* @__PURE__ */ new Map();
            #r = null;
            constructor(a, u, v, E, R) {
              this.messageHandler = a, this.loadingTask = u, this.commonObjs = new b(), this.fontLoader = new C.FontLoader({
                ownerDocument: E.ownerDocument,
                styleElement: E.styleElement
              }), this._params = E, this.canvasFactory = R.canvasFactory, this.filterFactory = R.filterFactory, this.cMapReaderFactory = R.cMapReaderFactory, this.standardFontDataFactory = R.standardFontDataFactory, this.destroyed = !1, this.destroyCapability = null, this._networkStream = v, this._fullReader = null, this._lastProgress = null, this.downloadInfoCapability = Promise.withResolvers(), this.setupMessageHandler();
            }
            #i(a, u = null) {
              const v = this.#t.get(a);
              if (v)
                return v;
              const E = this.messageHandler.sendWithPromise(a, u);
              return this.#t.set(a, E), E;
            }
            get annotationStorage() {
              return (0, N.shadow)(this, "annotationStorage", new U.AnnotationStorage());
            }
            getRenderingIntent(a, u = N.AnnotationMode.ENABLE, v = null, E = !1) {
              let R = N.RenderingIntentFlag.DISPLAY, k = U.SerializableEmpty;
              switch (a) {
                case "any":
                  R = N.RenderingIntentFlag.ANY;
                  break;
                case "display":
                  break;
                case "print":
                  R = N.RenderingIntentFlag.PRINT;
                  break;
                default:
                  (0, N.warn)(`getRenderingIntent - invalid intent: ${a}`);
              }
              switch (u) {
                case N.AnnotationMode.DISABLE:
                  R += N.RenderingIntentFlag.ANNOTATIONS_DISABLE;
                  break;
                case N.AnnotationMode.ENABLE:
                  break;
                case N.AnnotationMode.ENABLE_FORMS:
                  R += N.RenderingIntentFlag.ANNOTATIONS_FORMS;
                  break;
                case N.AnnotationMode.ENABLE_STORAGE:
                  R += N.RenderingIntentFlag.ANNOTATIONS_STORAGE, k = (R & N.RenderingIntentFlag.PRINT && v instanceof U.PrintAnnotationStorage ? v : this.annotationStorage).serializable;
                  break;
                default:
                  (0, N.warn)(`getRenderingIntent - invalid annotationMode: ${u}`);
              }
              return E && (R += N.RenderingIntentFlag.OPLIST), {
                renderingIntent: R,
                cacheKey: `${R}_${k.hash}`,
                annotationStorageSerializable: k
              };
            }
            destroy() {
              if (this.destroyCapability)
                return this.destroyCapability.promise;
              this.destroyed = !0, this.destroyCapability = Promise.withResolvers(), this.#r?.reject(new Error("Worker was destroyed during onPassword callback"));
              const a = [];
              for (const v of this.#e.values())
                a.push(v._destroy());
              this.#e.clear(), this.#s.clear(), this.#n.clear(), this.hasOwnProperty("annotationStorage") && this.annotationStorage.resetModified();
              const u = this.messageHandler.sendWithPromise("Terminate", null);
              return a.push(u), Promise.all(a).then(() => {
                this.commonObjs.clear(), this.fontLoader.clear(), this.#t.clear(), this.filterFactory.destroy(), (0, r.cleanupTextLayer)(), this._networkStream?.cancelAllRequests(new N.AbortException("Worker was terminated.")), this.messageHandler && (this.messageHandler.destroy(), this.messageHandler = null), this.destroyCapability.resolve();
              }, this.destroyCapability.reject), this.destroyCapability.promise;
            }
            setupMessageHandler() {
              const {
                messageHandler: a,
                loadingTask: u
              } = this;
              a.on("GetReader", (v, E) => {
                (0, N.assert)(this._networkStream, "GetReader - no `IPDFStream` instance available."), this._fullReader = this._networkStream.getFullReader(), this._fullReader.onProgress = (R) => {
                  this._lastProgress = {
                    loaded: R.loaded,
                    total: R.total
                  };
                }, E.onPull = () => {
                  this._fullReader.read().then(function({
                    value: R,
                    done: k
                  }) {
                    if (k) {
                      E.close();
                      return;
                    }
                    (0, N.assert)(R instanceof ArrayBuffer, "GetReader - expected an ArrayBuffer."), E.enqueue(new Uint8Array(R), 1, [R]);
                  }).catch((R) => {
                    E.error(R);
                  });
                }, E.onCancel = (R) => {
                  this._fullReader.cancel(R), E.ready.catch((k) => {
                    if (!this.destroyed)
                      throw k;
                  });
                };
              }), a.on("ReaderHeadersReady", (v) => {
                const E = Promise.withResolvers(), R = this._fullReader;
                return R.headersReady.then(() => {
                  (!R.isStreamingSupported || !R.isRangeSupported) && (this._lastProgress && u.onProgress?.(this._lastProgress), R.onProgress = (k) => {
                    u.onProgress?.({
                      loaded: k.loaded,
                      total: k.total
                    });
                  }), E.resolve({
                    isStreamingSupported: R.isStreamingSupported,
                    isRangeSupported: R.isRangeSupported,
                    contentLength: R.contentLength
                  });
                }, E.reject), E.promise;
              }), a.on("GetRangeReader", (v, E) => {
                (0, N.assert)(this._networkStream, "GetRangeReader - no `IPDFStream` instance available.");
                const R = this._networkStream.getRangeReader(v.begin, v.end);
                if (!R) {
                  E.close();
                  return;
                }
                E.onPull = () => {
                  R.read().then(function({
                    value: k,
                    done: D
                  }) {
                    if (D) {
                      E.close();
                      return;
                    }
                    (0, N.assert)(k instanceof ArrayBuffer, "GetRangeReader - expected an ArrayBuffer."), E.enqueue(new Uint8Array(k), 1, [k]);
                  }).catch((k) => {
                    E.error(k);
                  });
                }, E.onCancel = (k) => {
                  R.cancel(k), E.ready.catch((D) => {
                    if (!this.destroyed)
                      throw D;
                  });
                };
              }), a.on("GetDoc", ({
                pdfInfo: v
              }) => {
                this._numPages = v.numPages, this._htmlForXfa = v.htmlForXfa, delete v.htmlForXfa, u._capability.resolve(new ot(v, this));
              }), a.on("DocException", function(v) {
                let E;
                switch (v.name) {
                  case "PasswordException":
                    E = new N.PasswordException(v.message, v.code);
                    break;
                  case "InvalidPDFException":
                    E = new N.InvalidPDFException(v.message);
                    break;
                  case "MissingPDFException":
                    E = new N.MissingPDFException(v.message);
                    break;
                  case "UnexpectedResponseException":
                    E = new N.UnexpectedResponseException(v.message, v.status);
                    break;
                  case "UnknownErrorException":
                    E = new N.UnknownErrorException(v.message, v.details);
                    break;
                  default:
                    (0, N.unreachable)("DocException - expected a valid Error.");
                }
                u._capability.reject(E);
              }), a.on("PasswordRequest", (v) => {
                if (this.#r = Promise.withResolvers(), u.onPassword) {
                  const E = (R) => {
                    R instanceof Error ? this.#r.reject(R) : this.#r.resolve({
                      password: R
                    });
                  };
                  try {
                    u.onPassword(E, v.code);
                  } catch (R) {
                    this.#r.reject(R);
                  }
                } else
                  this.#r.reject(new N.PasswordException(v.message, v.code));
                return this.#r.promise;
              }), a.on("DataLoaded", (v) => {
                u.onProgress?.({
                  loaded: v.length,
                  total: v.length
                }), this.downloadInfoCapability.resolve(v);
              }), a.on("StartRenderPage", (v) => {
                if (this.destroyed)
                  return;
                this.#e.get(v.pageIndex)._startRenderPage(v.transparency, v.cacheKey);
              }), a.on("commonobj", ([v, E, R]) => {
                if (this.destroyed || this.commonObjs.has(v))
                  return null;
                switch (E) {
                  case "Font":
                    const k = this._params;
                    if ("error" in R) {
                      const T = R.error;
                      (0, N.warn)(`Error during font loading: ${T}`), this.commonObjs.resolve(v, T);
                      break;
                    }
                    const D = k.pdfBug && globalThis.FontInspector?.enabled ? (T, X) => globalThis.FontInspector.fontAdded(T, X) : null, I = new C.FontFaceObject(R, {
                      disableFontFace: k.disableFontFace,
                      ignoreErrors: k.ignoreErrors,
                      inspectFont: D
                    });
                    this.fontLoader.bind(I).catch(() => a.sendWithPromise("FontFallback", {
                      id: v
                    })).finally(() => {
                      !k.fontExtraProperties && I.data && (I.data = null), this.commonObjs.resolve(v, I);
                    });
                    break;
                  case "CopyLocalImage":
                    const {
                      imageRef: F
                    } = R;
                    (0, N.assert)(F, "The imageRef must be defined.");
                    for (const T of this.#e.values())
                      for (const [, X] of T.objs)
                        if (X.ref === F)
                          return X.dataLen ? (this.commonObjs.resolve(v, structuredClone(X)), X.dataLen) : null;
                    break;
                  case "FontPath":
                  case "Image":
                  case "Pattern":
                    this.commonObjs.resolve(v, R);
                    break;
                  default:
                    throw new Error(`Got unknown common object type ${E}`);
                }
                return null;
              }), a.on("obj", ([v, E, R, k]) => {
                if (this.destroyed)
                  return;
                const D = this.#e.get(E);
                if (!D.objs.has(v)) {
                  if (D._intentStates.size === 0) {
                    k?.bitmap?.close();
                    return;
                  }
                  switch (R) {
                    case "Image":
                      D.objs.resolve(v, k), k?.dataLen > N.MAX_IMAGE_SIZE_TO_CACHE && (D._maybeCleanupAfterRender = !0);
                      break;
                    case "Pattern":
                      D.objs.resolve(v, k);
                      break;
                    default:
                      throw new Error(`Got unknown object type ${R}`);
                  }
                }
              }), a.on("DocProgress", (v) => {
                this.destroyed || u.onProgress?.({
                  loaded: v.loaded,
                  total: v.total
                });
              }), a.on("FetchBuiltInCMap", (v) => this.destroyed ? Promise.reject(new Error("Worker was destroyed.")) : this.cMapReaderFactory ? this.cMapReaderFactory.fetch(v) : Promise.reject(new Error("CMapReaderFactory not initialized, see the `useWorkerFetch` parameter."))), a.on("FetchStandardFontData", (v) => this.destroyed ? Promise.reject(new Error("Worker was destroyed.")) : this.standardFontDataFactory ? this.standardFontDataFactory.fetch(v) : Promise.reject(new Error("StandardFontDataFactory not initialized, see the `useWorkerFetch` parameter.")));
            }
            getData() {
              return this.messageHandler.sendWithPromise("GetData", null);
            }
            saveDocument() {
              this.annotationStorage.size <= 0 && (0, N.warn)("saveDocument called while `annotationStorage` is empty, please use the getData-method instead.");
              const {
                map: a,
                transfer: u
              } = this.annotationStorage.serializable;
              return this.messageHandler.sendWithPromise("SaveDocument", {
                isPureXfa: !!this._htmlForXfa,
                numPages: this._numPages,
                annotationStorage: a,
                filename: this._fullReader?.filename ?? null
              }, u).finally(() => {
                this.annotationStorage.resetModified();
              });
            }
            getPage(a) {
              if (!Number.isInteger(a) || a <= 0 || a > this._numPages)
                return Promise.reject(new Error("Invalid page request."));
              const u = a - 1, v = this.#s.get(u);
              if (v)
                return v;
              const E = this.messageHandler.sendWithPromise("GetPage", {
                pageIndex: u
              }).then((R) => {
                if (this.destroyed)
                  throw new Error("Transport destroyed");
                R.refStr && this.#n.set(R.refStr, a);
                const k = new ct(u, R, this, this._params.pdfBug);
                return this.#e.set(u, k), k;
              });
              return this.#s.set(u, E), E;
            }
            getPageIndex(a) {
              return Y(a) ? this.messageHandler.sendWithPromise("GetPageIndex", {
                num: a.num,
                gen: a.gen
              }) : Promise.reject(new Error("Invalid pageIndex request."));
            }
            getAnnotations(a, u) {
              return this.messageHandler.sendWithPromise("GetAnnotations", {
                pageIndex: a,
                intent: u
              });
            }
            getFieldObjects() {
              return this.#i("GetFieldObjects");
            }
            hasJSActions() {
              return this.#i("HasJSActions");
            }
            getCalculationOrderIds() {
              return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
            }
            getDestinations() {
              return this.messageHandler.sendWithPromise("GetDestinations", null);
            }
            getDestination(a) {
              return typeof a != "string" ? Promise.reject(new Error("Invalid destination request.")) : this.messageHandler.sendWithPromise("GetDestination", {
                id: a
              });
            }
            getPageLabels() {
              return this.messageHandler.sendWithPromise("GetPageLabels", null);
            }
            getPageLayout() {
              return this.messageHandler.sendWithPromise("GetPageLayout", null);
            }
            getPageMode() {
              return this.messageHandler.sendWithPromise("GetPageMode", null);
            }
            getViewerPreferences() {
              return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
            }
            getOpenAction() {
              return this.messageHandler.sendWithPromise("GetOpenAction", null);
            }
            getAttachments() {
              return this.messageHandler.sendWithPromise("GetAttachments", null);
            }
            getDocJSActions() {
              return this.#i("GetDocJSActions");
            }
            getPageJSActions(a) {
              return this.messageHandler.sendWithPromise("GetPageJSActions", {
                pageIndex: a
              });
            }
            getStructTree(a) {
              return this.messageHandler.sendWithPromise("GetStructTree", {
                pageIndex: a
              });
            }
            getOutline() {
              return this.messageHandler.sendWithPromise("GetOutline", null);
            }
            getOptionalContentConfig(a) {
              return this.#i("GetOptionalContentConfig").then((u) => new s.OptionalContentConfig(u, a));
            }
            getPermissions() {
              return this.messageHandler.sendWithPromise("GetPermissions", null);
            }
            getMetadata() {
              const a = "GetMetadata", u = this.#t.get(a);
              if (u)
                return u;
              const v = this.messageHandler.sendWithPromise(a, null).then((E) => ({
                info: E[0],
                metadata: E[1] ? new m.Metadata(E[1]) : null,
                contentDispositionFilename: this._fullReader?.filename ?? null,
                contentLength: this._fullReader?.contentLength ?? null
              }));
              return this.#t.set(a, v), v;
            }
            getMarkInfo() {
              return this.messageHandler.sendWithPromise("GetMarkInfo", null);
            }
            async startCleanup(a = !1) {
              if (!this.destroyed) {
                await this.messageHandler.sendWithPromise("Cleanup", null);
                for (const u of this.#e.values())
                  if (!u.cleanup())
                    throw new Error(`startCleanup: Page ${u.pageNumber} is currently rendering.`);
                this.commonObjs.clear(), a || this.fontLoader.clear(), this.#t.clear(), this.filterFactory.destroy(!0), (0, r.cleanupTextLayer)();
              }
            }
            cachedPageNumber(a) {
              if (!Y(a))
                return null;
              const u = a.gen === 0 ? `${a.num}R` : `${a.num}R${a.gen}`;
              return this.#n.get(u) ?? null;
            }
            get loadingParams() {
              const {
                disableAutoFetch: a,
                enableXfa: u
              } = this._params;
              return (0, N.shadow)(this, "loadingParams", {
                disableAutoFetch: a,
                enableXfa: u
              });
            }
          }
          const st = Symbol("INITIAL_DATA");
          class b {
            #t = /* @__PURE__ */ Object.create(null);
            #e(a) {
              return this.#t[a] ||= {
                ...Promise.withResolvers(),
                data: st
              };
            }
            get(a, u = null) {
              if (u) {
                const E = this.#e(a);
                return E.promise.then(() => u(E.data)), null;
              }
              const v = this.#t[a];
              if (!v || v.data === st)
                throw new Error(`Requesting object that isn't resolved yet ${a}.`);
              return v.data;
            }
            has(a) {
              const u = this.#t[a];
              return !!u && u.data !== st;
            }
            resolve(a, u = null) {
              const v = this.#e(a);
              v.data = u, v.resolve();
            }
            clear() {
              for (const a in this.#t) {
                const {
                  data: u
                } = this.#t[a];
                u?.bitmap?.close();
              }
              this.#t = /* @__PURE__ */ Object.create(null);
            }
            *[Symbol.iterator]() {
              for (const a in this.#t) {
                const {
                  data: u
                } = this.#t[a];
                u !== st && (yield [a, u]);
              }
            }
          }
          class l {
            #t = null;
            constructor(a) {
              this.#t = a, this.onContinue = null;
            }
            get promise() {
              return this.#t.capability.promise;
            }
            cancel(a = 0) {
              this.#t.cancel(null, a);
            }
            get separateAnnots() {
              const {
                separateAnnots: a
              } = this.#t.operatorList;
              if (!a)
                return !1;
              const {
                annotationCanvasMap: u
              } = this.#t;
              return a.form || a.canvas && u?.size > 0;
            }
          }
          class e {
            static #t = /* @__PURE__ */ new WeakSet();
            constructor({
              callback: a,
              params: u,
              objs: v,
              commonObjs: E,
              annotationCanvasMap: R,
              operatorList: k,
              pageIndex: D,
              canvasFactory: I,
              filterFactory: F,
              useRequestAnimationFrame: T = !1,
              pdfBug: X = !1,
              pageColors: Q = null
            }) {
              this.callback = a, this.params = u, this.objs = v, this.commonObjs = E, this.annotationCanvasMap = R, this.operatorListIdx = null, this.operatorList = k, this._pageIndex = D, this.canvasFactory = I, this.filterFactory = F, this._pdfBug = X, this.pageColors = Q, this.running = !1, this.graphicsReadyCallback = null, this.graphicsReady = !1, this._useRequestAnimationFrame = T === !0 && typeof window < "u", this.cancelled = !1, this.capability = Promise.withResolvers(), this.task = new l(this), this._cancelBound = this.cancel.bind(this), this._continueBound = this._continue.bind(this), this._scheduleNextBound = this._scheduleNext.bind(this), this._nextBound = this._next.bind(this), this._canvas = u.canvasContext.canvas;
            }
            get completed() {
              return this.capability.promise.catch(function() {
              });
            }
            initializeGraphics({
              transparency: a = !1,
              optionalContentConfig: u
            }) {
              if (this.cancelled)
                return;
              if (this._canvas) {
                if (e.#t.has(this._canvas))
                  throw new Error("Cannot use the same canvas during multiple render() operations. Use different canvas or ensure previous operations were cancelled or completed.");
                e.#t.add(this._canvas);
              }
              this._pdfBug && globalThis.StepperManager?.enabled && (this.stepper = globalThis.StepperManager.create(this._pageIndex), this.stepper.init(this.operatorList), this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint());
              const {
                canvasContext: v,
                viewport: E,
                transform: R,
                background: k
              } = this.params;
              this.gfx = new A.CanvasGraphics(v, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, {
                optionalContentConfig: u
              }, this.annotationCanvasMap, this.pageColors), this.gfx.beginDrawing({
                transform: R,
                viewport: E,
                transparency: a,
                background: k
              }), this.operatorListIdx = 0, this.graphicsReady = !0, this.graphicsReadyCallback?.();
            }
            cancel(a = null, u = 0) {
              this.running = !1, this.cancelled = !0, this.gfx?.endDrawing(), e.#t.delete(this._canvas), this.callback(a || new L.RenderingCancelledException(`Rendering cancelled, page ${this._pageIndex + 1}`, u));
            }
            operatorListChanged() {
              if (!this.graphicsReady) {
                this.graphicsReadyCallback ||= this._continueBound;
                return;
              }
              this.stepper?.updateOperatorList(this.operatorList), !this.running && this._continue();
            }
            _continue() {
              this.running = !0, !this.cancelled && (this.task.onContinue ? this.task.onContinue(this._scheduleNextBound) : this._scheduleNext());
            }
            _scheduleNext() {
              this._useRequestAnimationFrame ? window.requestAnimationFrame(() => {
                this._nextBound().catch(this._cancelBound);
              }) : Promise.resolve().then(this._nextBound).catch(this._cancelBound);
            }
            async _next() {
              this.cancelled || (this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper), this.operatorListIdx === this.operatorList.argsArray.length && (this.running = !1, this.operatorList.lastChunk && (this.gfx.endDrawing(), e.#t.delete(this._canvas), this.callback())));
            }
          }
          const n = "4.2.67", p = "49b388101";
          B();
        } catch (S) {
          B(S);
        }
      });
    }
  ),
  /***/
  583: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        BaseCMapReaderFactory: () => (
          /* binding */
          U
        ),
        /* harmony export */
        BaseCanvasFactory: () => (
          /* binding */
          N
        ),
        /* harmony export */
        BaseFilterFactory: () => (
          /* binding */
          B
        ),
        /* harmony export */
        BaseSVGFactory: () => (
          /* binding */
          C
        ),
        /* harmony export */
        BaseStandardFontDataFactory: () => (
          /* binding */
          L
        )
        /* harmony export */
      });
      var y = V(292);
      class B {
        constructor() {
          this.constructor === B && (0, y.unreachable)("Cannot initialize BaseFilterFactory.");
        }
        addFilter(A) {
          return "none";
        }
        addHCMFilter(A, r) {
          return "none";
        }
        addHighlightHCMFilter(A, r, d, c, m) {
          return "none";
        }
        destroy(A = !1) {
        }
      }
      class N {
        constructor() {
          this.constructor === N && (0, y.unreachable)("Cannot initialize BaseCanvasFactory.");
        }
        create(A, r) {
          if (A <= 0 || r <= 0)
            throw new Error("Invalid canvas size");
          const d = this._createCanvas(A, r);
          return {
            canvas: d,
            context: d.getContext("2d")
          };
        }
        reset(A, r, d) {
          if (!A.canvas)
            throw new Error("Canvas is not specified");
          if (r <= 0 || d <= 0)
            throw new Error("Invalid canvas size");
          A.canvas.width = r, A.canvas.height = d;
        }
        destroy(A) {
          if (!A.canvas)
            throw new Error("Canvas is not specified");
          A.canvas.width = 0, A.canvas.height = 0, A.canvas = null, A.context = null;
        }
        _createCanvas(A, r) {
          (0, y.unreachable)("Abstract method `_createCanvas` called.");
        }
      }
      class U {
        constructor({
          baseUrl: A = null,
          isCompressed: r = !0
        }) {
          this.constructor === U && (0, y.unreachable)("Cannot initialize BaseCMapReaderFactory."), this.baseUrl = A, this.isCompressed = r;
        }
        async fetch({
          name: A
        }) {
          if (!this.baseUrl)
            throw new Error('The CMap "baseUrl" parameter must be specified, ensure that the "cMapUrl" and "cMapPacked" API parameters are provided.');
          if (!A)
            throw new Error("CMap name must be specified.");
          const r = this.baseUrl + A + (this.isCompressed ? ".bcmap" : ""), d = this.isCompressed ? y.CMapCompressionType.BINARY : y.CMapCompressionType.NONE;
          return this._fetchData(r, d).catch((c) => {
            throw new Error(`Unable to load ${this.isCompressed ? "binary " : ""}CMap at: ${r}`);
          });
        }
        _fetchData(A, r) {
          (0, y.unreachable)("Abstract method `_fetchData` called.");
        }
      }
      class L {
        constructor({
          baseUrl: A = null
        }) {
          this.constructor === L && (0, y.unreachable)("Cannot initialize BaseStandardFontDataFactory."), this.baseUrl = A;
        }
        async fetch({
          filename: A
        }) {
          if (!this.baseUrl)
            throw new Error('The standard font "baseUrl" parameter must be specified, ensure that the "standardFontDataUrl" API parameter is provided.');
          if (!A)
            throw new Error("Font filename must be specified.");
          const r = `${this.baseUrl}${A}`;
          return this._fetchData(r).catch((d) => {
            throw new Error(`Unable to load font data at: ${r}`);
          });
        }
        _fetchData(A) {
          (0, y.unreachable)("Abstract method `_fetchData` called.");
        }
      }
      class C {
        constructor() {
          this.constructor === C && (0, y.unreachable)("Cannot initialize BaseSVGFactory.");
        }
        create(A, r, d = !1) {
          if (A <= 0 || r <= 0)
            throw new Error("Invalid SVG dimensions");
          const c = this._createSVG("svg:svg");
          return c.setAttribute("version", "1.1"), d || (c.setAttribute("width", `${A}px`), c.setAttribute("height", `${r}px`)), c.setAttribute("preserveAspectRatio", "none"), c.setAttribute("viewBox", `0 0 ${A} ${r}`), c;
        }
        createElement(A) {
          if (typeof A != "string")
            throw new Error("Invalid SVG element type");
          return this._createSVG(A);
        }
        _createSVG(A) {
          (0, y.unreachable)("Abstract method `_createSVG` called.");
        }
      }
    }
  ),
  /***/
  923: (
    /***/
    (at, W, V) => {
      V.d(W, {
        CanvasGraphics: () => (
          /* binding */
          b
        )
      });
      var y = V(292), B = V(419);
      const N = {
        FILL: "Fill",
        STROKE: "Stroke",
        SHADING: "Shading"
      };
      function U(l, e) {
        if (!e)
          return;
        const n = e[2] - e[0], p = e[3] - e[1], o = new Path2D();
        o.rect(e[0], e[1], n, p), l.clip(o);
      }
      class L {
        constructor() {
          this.constructor === L && (0, y.unreachable)("Cannot initialize BaseShadingPattern.");
        }
        getPattern() {
          (0, y.unreachable)("Abstract method `getPattern` called.");
        }
      }
      class C extends L {
        constructor(e) {
          super(), this._type = e[1], this._bbox = e[2], this._colorStops = e[3], this._p0 = e[4], this._p1 = e[5], this._r0 = e[6], this._r1 = e[7], this.matrix = null;
        }
        _createGradient(e) {
          let n;
          this._type === "axial" ? n = e.createLinearGradient(this._p0[0], this._p0[1], this._p1[0], this._p1[1]) : this._type === "radial" && (n = e.createRadialGradient(this._p0[0], this._p0[1], this._r0, this._p1[0], this._p1[1], this._r1));
          for (const p of this._colorStops)
            n.addColorStop(p[0], p[1]);
          return n;
        }
        getPattern(e, n, p, o) {
          let a;
          if (o === N.STROKE || o === N.FILL) {
            const u = n.current.getClippedPathBoundingBox(o, (0, B.getCurrentTransform)(e)) || [0, 0, 0, 0], v = Math.ceil(u[2] - u[0]) || 1, E = Math.ceil(u[3] - u[1]) || 1, R = n.cachedCanvases.getCanvas("pattern", v, E, !0), k = R.context;
            k.clearRect(0, 0, k.canvas.width, k.canvas.height), k.beginPath(), k.rect(0, 0, k.canvas.width, k.canvas.height), k.translate(-u[0], -u[1]), p = y.Util.transform(p, [1, 0, 0, 1, u[0], u[1]]), k.transform(...n.baseTransform), this.matrix && k.transform(...this.matrix), U(k, this._bbox), k.fillStyle = this._createGradient(k), k.fill(), a = e.createPattern(R.canvas, "no-repeat");
            const D = new DOMMatrix(p);
            a.setTransform(D);
          } else
            U(e, this._bbox), a = this._createGradient(e);
          return a;
        }
      }
      function x(l, e, n, p, o, a, u, v) {
        const E = e.coords, R = e.colors, k = l.data, D = l.width * 4;
        let I;
        E[n + 1] > E[p + 1] && (I = n, n = p, p = I, I = a, a = u, u = I), E[p + 1] > E[o + 1] && (I = p, p = o, o = I, I = u, u = v, v = I), E[n + 1] > E[p + 1] && (I = n, n = p, p = I, I = a, a = u, u = I);
        const F = (E[n] + e.offsetX) * e.scaleX, T = (E[n + 1] + e.offsetY) * e.scaleY, X = (E[p] + e.offsetX) * e.scaleX, Q = (E[p + 1] + e.offsetY) * e.scaleY, $ = (E[o] + e.offsetX) * e.scaleX, q = (E[o + 1] + e.offsetY) * e.scaleY;
        if (T >= q)
          return;
        const rt = R[a], Z = R[a + 1], J = R[a + 2], it = R[u], lt = R[u + 1], gt = R[u + 2], bt = R[v], At = R[v + 1], mt = R[v + 2], Ct = Math.round(T), St = Math.round(q);
        let Tt, vt, Et, Rt, Lt, Nt, Ht, Pt;
        for (let xt = Ct; xt <= St; xt++) {
          if (xt < Q) {
            const yt = xt < T ? 0 : (T - xt) / (T - Q);
            Tt = F - (F - X) * yt, vt = rt - (rt - it) * yt, Et = Z - (Z - lt) * yt, Rt = J - (J - gt) * yt;
          } else {
            let yt;
            xt > q ? yt = 1 : Q === q ? yt = 0 : yt = (Q - xt) / (Q - q), Tt = X - (X - $) * yt, vt = it - (it - bt) * yt, Et = lt - (lt - At) * yt, Rt = gt - (gt - mt) * yt;
          }
          let wt;
          xt < T ? wt = 0 : xt > q ? wt = 1 : wt = (T - xt) / (T - q), Lt = F - (F - $) * wt, Nt = rt - (rt - bt) * wt, Ht = Z - (Z - At) * wt, Pt = J - (J - mt) * wt;
          const Bt = Math.round(Math.min(Tt, Lt)), Dt = Math.round(Math.max(Tt, Lt));
          let Mt = D * xt + Bt * 4;
          for (let yt = Bt; yt <= Dt; yt++)
            wt = (Tt - yt) / (Tt - Lt), wt < 0 ? wt = 0 : wt > 1 && (wt = 1), k[Mt++] = vt - (vt - Nt) * wt | 0, k[Mt++] = Et - (Et - Ht) * wt | 0, k[Mt++] = Rt - (Rt - Pt) * wt | 0, k[Mt++] = 255;
        }
      }
      function A(l, e, n) {
        const p = e.coords, o = e.colors;
        let a, u;
        switch (e.type) {
          case "lattice":
            const v = e.verticesPerRow, E = Math.floor(p.length / v) - 1, R = v - 1;
            for (a = 0; a < E; a++) {
              let k = a * v;
              for (let D = 0; D < R; D++, k++)
                x(l, n, p[k], p[k + 1], p[k + v], o[k], o[k + 1], o[k + v]), x(l, n, p[k + v + 1], p[k + 1], p[k + v], o[k + v + 1], o[k + 1], o[k + v]);
            }
            break;
          case "triangles":
            for (a = 0, u = p.length; a < u; a += 3)
              x(l, n, p[a], p[a + 1], p[a + 2], o[a], o[a + 1], o[a + 2]);
            break;
          default:
            throw new Error("illegal figure");
        }
      }
      class r extends L {
        constructor(e) {
          super(), this._coords = e[2], this._colors = e[3], this._figures = e[4], this._bounds = e[5], this._bbox = e[7], this._background = e[8], this.matrix = null;
        }
        _createMeshCanvas(e, n, p) {
          const v = Math.floor(this._bounds[0]), E = Math.floor(this._bounds[1]), R = Math.ceil(this._bounds[2]) - v, k = Math.ceil(this._bounds[3]) - E, D = Math.min(Math.ceil(Math.abs(R * e[0] * 1.1)), 3e3), I = Math.min(Math.ceil(Math.abs(k * e[1] * 1.1)), 3e3), F = R / D, T = k / I, X = {
            coords: this._coords,
            colors: this._colors,
            offsetX: -v,
            offsetY: -E,
            scaleX: 1 / F,
            scaleY: 1 / T
          }, Q = D + 2 * 2, $ = I + 2 * 2, q = p.getCanvas("mesh", Q, $, !1), rt = q.context, Z = rt.createImageData(D, I);
          if (n) {
            const it = Z.data;
            for (let lt = 0, gt = it.length; lt < gt; lt += 4)
              it[lt] = n[0], it[lt + 1] = n[1], it[lt + 2] = n[2], it[lt + 3] = 255;
          }
          for (const it of this._figures)
            A(Z, it, X);
          return rt.putImageData(Z, 2, 2), {
            canvas: q.canvas,
            offsetX: v - 2 * F,
            offsetY: E - 2 * T,
            scaleX: F,
            scaleY: T
          };
        }
        getPattern(e, n, p, o) {
          U(e, this._bbox);
          let a;
          if (o === N.SHADING)
            a = y.Util.singularValueDecompose2dScale((0, B.getCurrentTransform)(e));
          else if (a = y.Util.singularValueDecompose2dScale(n.baseTransform), this.matrix) {
            const v = y.Util.singularValueDecompose2dScale(this.matrix);
            a = [a[0] * v[0], a[1] * v[1]];
          }
          const u = this._createMeshCanvas(a, o === N.SHADING ? null : this._background, n.cachedCanvases);
          return o !== N.SHADING && (e.setTransform(...n.baseTransform), this.matrix && e.transform(...this.matrix)), e.translate(u.offsetX, u.offsetY), e.scale(u.scaleX, u.scaleY), e.createPattern(u.canvas, "no-repeat");
        }
      }
      class d extends L {
        getPattern() {
          return "hotpink";
        }
      }
      function c(l) {
        switch (l[0]) {
          case "RadialAxial":
            return new C(l);
          case "Mesh":
            return new r(l);
          case "Dummy":
            return new d();
        }
        throw new Error(`Unknown IR type: ${l[0]}`);
      }
      const m = {
        COLORED: 1,
        UNCOLORED: 2
      };
      class s {
        static MAX_PATTERN_SIZE = 3e3;
        constructor(e, n, p, o, a) {
          this.operatorList = e[2], this.matrix = e[3] || [1, 0, 0, 1, 0, 0], this.bbox = e[4], this.xstep = e[5], this.ystep = e[6], this.paintType = e[7], this.tilingType = e[8], this.color = n, this.ctx = p, this.canvasGraphicsFactory = o, this.baseTransform = a;
        }
        createPatternCanvas(e) {
          const n = this.operatorList, p = this.bbox, o = this.xstep, a = this.ystep, u = this.paintType, v = this.tilingType, E = this.color, R = this.canvasGraphicsFactory;
          (0, y.info)("TilingType: " + v);
          const k = p[0], D = p[1], I = p[2], F = p[3], T = y.Util.singularValueDecompose2dScale(this.matrix), X = y.Util.singularValueDecompose2dScale(this.baseTransform), Q = [T[0] * X[0], T[1] * X[1]], $ = this.getSizeAndScale(o, this.ctx.canvas.width, Q[0]), q = this.getSizeAndScale(a, this.ctx.canvas.height, Q[1]), rt = e.cachedCanvases.getCanvas("pattern", $.size, q.size, !0), Z = rt.context, J = R.createCanvasGraphics(Z);
          J.groupLevel = e.groupLevel, this.setFillAndStrokeStyleToContext(J, u, E);
          let it = k, lt = D, gt = I, bt = F;
          return k < 0 && (it = 0, gt += Math.abs(k)), D < 0 && (lt = 0, bt += Math.abs(D)), Z.translate(-($.scale * it), -(q.scale * lt)), J.transform($.scale, 0, 0, q.scale, 0, 0), Z.save(), this.clipBbox(J, it, lt, gt, bt), J.baseTransform = (0, B.getCurrentTransform)(J.ctx), J.executeOperatorList(n), J.endDrawing(), {
            canvas: rt.canvas,
            scaleX: $.scale,
            scaleY: q.scale,
            offsetX: it,
            offsetY: lt
          };
        }
        getSizeAndScale(e, n, p) {
          e = Math.abs(e);
          const o = Math.max(s.MAX_PATTERN_SIZE, n);
          let a = Math.ceil(e * p);
          return a >= o ? a = o : p = a / e, {
            scale: p,
            size: a
          };
        }
        clipBbox(e, n, p, o, a) {
          const u = o - n, v = a - p;
          e.ctx.rect(n, p, u, v), e.current.updateRectMinMax((0, B.getCurrentTransform)(e.ctx), [n, p, o, a]), e.clip(), e.endPath();
        }
        setFillAndStrokeStyleToContext(e, n, p) {
          const o = e.ctx, a = e.current;
          switch (n) {
            case m.COLORED:
              const u = this.ctx;
              o.fillStyle = u.fillStyle, o.strokeStyle = u.strokeStyle, a.fillColor = u.fillStyle, a.strokeColor = u.strokeStyle;
              break;
            case m.UNCOLORED:
              const v = y.Util.makeHexColor(p[0], p[1], p[2]);
              o.fillStyle = v, o.strokeStyle = v, a.fillColor = v, a.strokeColor = v;
              break;
            default:
              throw new y.FormatError(`Unsupported paint type: ${n}`);
          }
        }
        getPattern(e, n, p, o) {
          let a = p;
          o !== N.SHADING && (a = y.Util.transform(a, n.baseTransform), this.matrix && (a = y.Util.transform(a, this.matrix)));
          const u = this.createPatternCanvas(n);
          let v = new DOMMatrix(a);
          v = v.translate(u.offsetX, u.offsetY), v = v.scale(1 / u.scaleX, 1 / u.scaleY);
          const E = e.createPattern(u.canvas, "repeat");
          return E.setTransform(v), E;
        }
      }
      function g({
        src: l,
        srcPos: e = 0,
        dest: n,
        width: p,
        height: o,
        nonBlackColor: a = 4294967295,
        inverseDecode: u = !1
      }) {
        const v = y.FeatureTest.isLittleEndian ? 4278190080 : 255, [E, R] = u ? [a, v] : [v, a], k = p >> 3, D = p & 7, I = l.length;
        n = new Uint32Array(n.buffer);
        let F = 0;
        for (let T = 0; T < o; T++) {
          for (const Q = e + k; e < Q; e++) {
            const $ = e < I ? l[e] : 255;
            n[F++] = $ & 128 ? R : E, n[F++] = $ & 64 ? R : E, n[F++] = $ & 32 ? R : E, n[F++] = $ & 16 ? R : E, n[F++] = $ & 8 ? R : E, n[F++] = $ & 4 ? R : E, n[F++] = $ & 2 ? R : E, n[F++] = $ & 1 ? R : E;
          }
          if (D === 0)
            continue;
          const X = e < I ? l[e++] : 255;
          for (let Q = 0; Q < D; Q++)
            n[F++] = X & 1 << 7 - Q ? R : E;
        }
        return {
          srcPos: e,
          destPos: F
        };
      }
      const t = 16, i = 100, h = 4096, f = 15, w = 10, S = 1e3, P = 16;
      function M(l, e) {
        if (l._removeMirroring)
          throw new Error("Context is already forwarding operations.");
        l.__originalSave = l.save, l.__originalRestore = l.restore, l.__originalRotate = l.rotate, l.__originalScale = l.scale, l.__originalTranslate = l.translate, l.__originalTransform = l.transform, l.__originalSetTransform = l.setTransform, l.__originalResetTransform = l.resetTransform, l.__originalClip = l.clip, l.__originalMoveTo = l.moveTo, l.__originalLineTo = l.lineTo, l.__originalBezierCurveTo = l.bezierCurveTo, l.__originalRect = l.rect, l.__originalClosePath = l.closePath, l.__originalBeginPath = l.beginPath, l._removeMirroring = () => {
          l.save = l.__originalSave, l.restore = l.__originalRestore, l.rotate = l.__originalRotate, l.scale = l.__originalScale, l.translate = l.__originalTranslate, l.transform = l.__originalTransform, l.setTransform = l.__originalSetTransform, l.resetTransform = l.__originalResetTransform, l.clip = l.__originalClip, l.moveTo = l.__originalMoveTo, l.lineTo = l.__originalLineTo, l.bezierCurveTo = l.__originalBezierCurveTo, l.rect = l.__originalRect, l.closePath = l.__originalClosePath, l.beginPath = l.__originalBeginPath, delete l._removeMirroring;
        }, l.save = function() {
          e.save(), this.__originalSave();
        }, l.restore = function() {
          e.restore(), this.__originalRestore();
        }, l.translate = function(p, o) {
          e.translate(p, o), this.__originalTranslate(p, o);
        }, l.scale = function(p, o) {
          e.scale(p, o), this.__originalScale(p, o);
        }, l.transform = function(p, o, a, u, v, E) {
          e.transform(p, o, a, u, v, E), this.__originalTransform(p, o, a, u, v, E);
        }, l.setTransform = function(p, o, a, u, v, E) {
          e.setTransform(p, o, a, u, v, E), this.__originalSetTransform(p, o, a, u, v, E);
        }, l.resetTransform = function() {
          e.resetTransform(), this.__originalResetTransform();
        }, l.rotate = function(p) {
          e.rotate(p), this.__originalRotate(p);
        }, l.clip = function(p) {
          e.clip(p), this.__originalClip(p);
        }, l.moveTo = function(n, p) {
          e.moveTo(n, p), this.__originalMoveTo(n, p);
        }, l.lineTo = function(n, p) {
          e.lineTo(n, p), this.__originalLineTo(n, p);
        }, l.bezierCurveTo = function(n, p, o, a, u, v) {
          e.bezierCurveTo(n, p, o, a, u, v), this.__originalBezierCurveTo(n, p, o, a, u, v);
        }, l.rect = function(n, p, o, a) {
          e.rect(n, p, o, a), this.__originalRect(n, p, o, a);
        }, l.closePath = function() {
          e.closePath(), this.__originalClosePath();
        }, l.beginPath = function() {
          e.beginPath(), this.__originalBeginPath();
        };
      }
      class O {
        constructor(e) {
          this.canvasFactory = e, this.cache = /* @__PURE__ */ Object.create(null);
        }
        getCanvas(e, n, p) {
          let o;
          return this.cache[e] !== void 0 ? (o = this.cache[e], this.canvasFactory.reset(o, n, p)) : (o = this.canvasFactory.create(n, p), this.cache[e] = o), o;
        }
        delete(e) {
          delete this.cache[e];
        }
        clear() {
          for (const e in this.cache) {
            const n = this.cache[e];
            this.canvasFactory.destroy(n), delete this.cache[e];
          }
        }
      }
      function _(l, e, n, p, o, a, u, v, E, R) {
        const [k, D, I, F, T, X] = (0, B.getCurrentTransform)(l);
        if (D === 0 && I === 0) {
          const q = u * k + T, rt = Math.round(q), Z = v * F + X, J = Math.round(Z), it = (u + E) * k + T, lt = Math.abs(Math.round(it) - rt) || 1, gt = (v + R) * F + X, bt = Math.abs(Math.round(gt) - J) || 1;
          return l.setTransform(Math.sign(k), 0, 0, Math.sign(F), rt, J), l.drawImage(e, n, p, o, a, 0, 0, lt, bt), l.setTransform(k, D, I, F, T, X), [lt, bt];
        }
        if (k === 0 && F === 0) {
          const q = v * I + T, rt = Math.round(q), Z = u * D + X, J = Math.round(Z), it = (v + R) * I + T, lt = Math.abs(Math.round(it) - rt) || 1, gt = (u + E) * D + X, bt = Math.abs(Math.round(gt) - J) || 1;
          return l.setTransform(0, Math.sign(D), Math.sign(I), 0, rt, J), l.drawImage(e, n, p, o, a, 0, 0, bt, lt), l.setTransform(k, D, I, F, T, X), [bt, lt];
        }
        l.drawImage(e, n, p, o, a, u, v, E, R);
        const Q = Math.hypot(k, D), $ = Math.hypot(I, F);
        return [Q * E, $ * R];
      }
      function z(l) {
        const {
          width: e,
          height: n
        } = l;
        if (e > S || n > S)
          return null;
        const p = 1e3, o = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]), a = e + 1;
        let u = new Uint8Array(a * (n + 1)), v, E, R;
        const k = e + 7 & -8;
        let D = new Uint8Array(k * n), I = 0;
        for (const $ of l.data) {
          let q = 128;
          for (; q > 0; )
            D[I++] = $ & q ? 0 : 255, q >>= 1;
        }
        let F = 0;
        for (I = 0, D[I] !== 0 && (u[0] = 1, ++F), E = 1; E < e; E++)
          D[I] !== D[I + 1] && (u[E] = D[I] ? 2 : 1, ++F), I++;
        for (D[I] !== 0 && (u[E] = 2, ++F), v = 1; v < n; v++) {
          I = v * k, R = v * a, D[I - k] !== D[I] && (u[R] = D[I] ? 1 : 8, ++F);
          let $ = (D[I] ? 4 : 0) + (D[I - k] ? 8 : 0);
          for (E = 1; E < e; E++)
            $ = ($ >> 2) + (D[I + 1] ? 4 : 0) + (D[I - k + 1] ? 8 : 0), o[$] && (u[R + E] = o[$], ++F), I++;
          if (D[I - k] !== D[I] && (u[R + E] = D[I] ? 2 : 4, ++F), F > p)
            return null;
        }
        for (I = k * (n - 1), R = v * a, D[I] !== 0 && (u[R] = 8, ++F), E = 1; E < e; E++)
          D[I] !== D[I + 1] && (u[R + E] = D[I] ? 4 : 8, ++F), I++;
        if (D[I] !== 0 && (u[R + E] = 4, ++F), F > p)
          return null;
        const T = new Int32Array([0, a, -1, 0, -a, 0, 0, 0, 1]), X = new Path2D();
        for (v = 0; F && v <= n; v++) {
          let $ = v * a;
          const q = $ + e;
          for (; $ < q && !u[$]; )
            $++;
          if ($ === q)
            continue;
          X.moveTo($ % a, v);
          const rt = $;
          let Z = u[$];
          do {
            const J = T[Z];
            do
              $ += J;
            while (!u[$]);
            const it = u[$];
            it !== 5 && it !== 10 ? (Z = it, u[$] = 0) : (Z = it & 51 * Z >> 4, u[$] &= Z >> 2 | Z << 2), X.lineTo($ % a, $ / a | 0), u[$] || --F;
          } while (rt !== $);
          --v;
        }
        return D = null, u = null, function($) {
          $.save(), $.scale(1 / e, -1 / n), $.translate(0, -n), $.fill(X), $.beginPath(), $.restore();
        };
      }
      class K {
        constructor(e, n) {
          this.alphaIsShape = !1, this.fontSize = 0, this.fontSizeScale = 1, this.textMatrix = y.IDENTITY_MATRIX, this.textMatrixScale = 1, this.fontMatrix = y.FONT_IDENTITY_MATRIX, this.leading = 0, this.x = 0, this.y = 0, this.lineX = 0, this.lineY = 0, this.charSpacing = 0, this.wordSpacing = 0, this.textHScale = 1, this.textRenderingMode = y.TextRenderingMode.FILL, this.textRise = 0, this.fillColor = "#000000", this.strokeColor = "#000000", this.patternFill = !1, this.fillAlpha = 1, this.strokeAlpha = 1, this.lineWidth = 1, this.activeSMask = null, this.transferMaps = "none", this.startNewPathAndClipBox([0, 0, e, n]);
        }
        clone() {
          const e = Object.create(this);
          return e.clipBox = this.clipBox.slice(), e;
        }
        setCurrentPoint(e, n) {
          this.x = e, this.y = n;
        }
        updatePathMinMax(e, n, p) {
          [n, p] = y.Util.applyTransform([n, p], e), this.minX = Math.min(this.minX, n), this.minY = Math.min(this.minY, p), this.maxX = Math.max(this.maxX, n), this.maxY = Math.max(this.maxY, p);
        }
        updateRectMinMax(e, n) {
          const p = y.Util.applyTransform(n, e), o = y.Util.applyTransform(n.slice(2), e), a = y.Util.applyTransform([n[0], n[3]], e), u = y.Util.applyTransform([n[2], n[1]], e);
          this.minX = Math.min(this.minX, p[0], o[0], a[0], u[0]), this.minY = Math.min(this.minY, p[1], o[1], a[1], u[1]), this.maxX = Math.max(this.maxX, p[0], o[0], a[0], u[0]), this.maxY = Math.max(this.maxY, p[1], o[1], a[1], u[1]);
        }
        updateScalingPathMinMax(e, n) {
          y.Util.scaleMinMax(e, n), this.minX = Math.min(this.minX, n[0]), this.minY = Math.min(this.minY, n[1]), this.maxX = Math.max(this.maxX, n[2]), this.maxY = Math.max(this.maxY, n[3]);
        }
        updateCurvePathMinMax(e, n, p, o, a, u, v, E, R, k) {
          const D = y.Util.bezierBoundingBox(n, p, o, a, u, v, E, R, k);
          k || this.updateRectMinMax(e, D);
        }
        getPathBoundingBox(e = N.FILL, n = null) {
          const p = [this.minX, this.minY, this.maxX, this.maxY];
          if (e === N.STROKE) {
            n || (0, y.unreachable)("Stroke bounding box must include transform.");
            const o = y.Util.singularValueDecompose2dScale(n), a = o[0] * this.lineWidth / 2, u = o[1] * this.lineWidth / 2;
            p[0] -= a, p[1] -= u, p[2] += a, p[3] += u;
          }
          return p;
        }
        updateClipFromPath() {
          const e = y.Util.intersect(this.clipBox, this.getPathBoundingBox());
          this.startNewPathAndClipBox(e || [0, 0, 0, 0]);
        }
        isEmptyClip() {
          return this.minX === 1 / 0;
        }
        startNewPathAndClipBox(e) {
          this.clipBox = e, this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = 0, this.maxY = 0;
        }
        getClippedPathBoundingBox(e = N.FILL, n = null) {
          return y.Util.intersect(this.clipBox, this.getPathBoundingBox(e, n));
        }
      }
      function nt(l, e) {
        if (typeof ImageData < "u" && e instanceof ImageData) {
          l.putImageData(e, 0, 0);
          return;
        }
        const n = e.height, p = e.width, o = n % P, a = (n - o) / P, u = o === 0 ? a : a + 1, v = l.createImageData(p, P);
        let E = 0, R;
        const k = e.data, D = v.data;
        let I, F, T, X;
        if (e.kind === y.ImageKind.GRAYSCALE_1BPP) {
          const Q = k.byteLength, $ = new Uint32Array(D.buffer, 0, D.byteLength >> 2), q = $.length, rt = p + 7 >> 3, Z = 4294967295, J = y.FeatureTest.isLittleEndian ? 4278190080 : 255;
          for (I = 0; I < u; I++) {
            for (T = I < a ? P : o, R = 0, F = 0; F < T; F++) {
              const it = Q - E;
              let lt = 0;
              const gt = it > rt ? p : it * 8 - 7, bt = gt & -8;
              let At = 0, mt = 0;
              for (; lt < bt; lt += 8)
                mt = k[E++], $[R++] = mt & 128 ? Z : J, $[R++] = mt & 64 ? Z : J, $[R++] = mt & 32 ? Z : J, $[R++] = mt & 16 ? Z : J, $[R++] = mt & 8 ? Z : J, $[R++] = mt & 4 ? Z : J, $[R++] = mt & 2 ? Z : J, $[R++] = mt & 1 ? Z : J;
              for (; lt < gt; lt++)
                At === 0 && (mt = k[E++], At = 128), $[R++] = mt & At ? Z : J, At >>= 1;
            }
            for (; R < q; )
              $[R++] = 0;
            l.putImageData(v, 0, I * P);
          }
        } else if (e.kind === y.ImageKind.RGBA_32BPP) {
          for (F = 0, X = p * P * 4, I = 0; I < a; I++)
            D.set(k.subarray(E, E + X)), E += X, l.putImageData(v, 0, F), F += P;
          I < u && (X = p * o * 4, D.set(k.subarray(E, E + X)), l.putImageData(v, 0, F));
        } else if (e.kind === y.ImageKind.RGB_24BPP)
          for (T = P, X = p * T, I = 0; I < u; I++) {
            for (I >= a && (T = o, X = p * T), R = 0, F = X; F--; )
              D[R++] = k[E++], D[R++] = k[E++], D[R++] = k[E++], D[R++] = 255;
            l.putImageData(v, 0, I * P);
          }
        else
          throw new Error(`bad image kind: ${e.kind}`);
      }
      function j(l, e) {
        if (e.bitmap) {
          l.drawImage(e.bitmap, 0, 0);
          return;
        }
        const n = e.height, p = e.width, o = n % P, a = (n - o) / P, u = o === 0 ? a : a + 1, v = l.createImageData(p, P);
        let E = 0;
        const R = e.data, k = v.data;
        for (let D = 0; D < u; D++) {
          const I = D < a ? P : o;
          ({
            srcPos: E
          } = g({
            src: R,
            srcPos: E,
            dest: k,
            width: p,
            height: I,
            nonBlackColor: 0
          })), l.putImageData(v, 0, D * P);
        }
      }
      function H(l, e) {
        const n = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font", "filter"];
        for (const p of n)
          l[p] !== void 0 && (e[p] = l[p]);
        l.setLineDash !== void 0 && (e.setLineDash(l.getLineDash()), e.lineDashOffset = l.lineDashOffset);
      }
      function G(l) {
        if (l.strokeStyle = l.fillStyle = "#000000", l.fillRule = "nonzero", l.globalAlpha = 1, l.lineWidth = 1, l.lineCap = "butt", l.lineJoin = "miter", l.miterLimit = 10, l.globalCompositeOperation = "source-over", l.font = "10px sans-serif", l.setLineDash !== void 0 && (l.setLineDash([]), l.lineDashOffset = 0), !y.isNodeJS) {
          const {
            filter: e
          } = l;
          e !== "none" && e !== "" && (l.filter = "none");
        }
      }
      function Y(l, e, n, p) {
        const o = l.length;
        for (let a = 3; a < o; a += 4) {
          const u = l[a];
          if (u === 0)
            l[a - 3] = e, l[a - 2] = n, l[a - 1] = p;
          else if (u < 255) {
            const v = 255 - u;
            l[a - 3] = l[a - 3] * u + e * v >> 8, l[a - 2] = l[a - 2] * u + n * v >> 8, l[a - 1] = l[a - 1] * u + p * v >> 8;
          }
        }
      }
      function et(l, e, n) {
        const p = l.length, o = 1 / 255;
        for (let a = 3; a < p; a += 4) {
          const u = n ? n[l[a]] : l[a];
          e[a] = e[a] * u * o | 0;
        }
      }
      function tt(l, e, n) {
        const p = l.length;
        for (let o = 3; o < p; o += 4) {
          const a = l[o - 3] * 77 + l[o - 2] * 152 + l[o - 1] * 28;
          e[o] = n ? e[o] * n[a >> 8] >> 8 : e[o] * a >> 16;
        }
      }
      function ot(l, e, n, p, o, a, u, v, E, R, k) {
        const D = !!a, I = D ? a[0] : 0, F = D ? a[1] : 0, T = D ? a[2] : 0, X = o === "Luminosity" ? tt : et, $ = Math.min(p, Math.ceil(1048576 / n));
        for (let q = 0; q < p; q += $) {
          const rt = Math.min($, p - q), Z = l.getImageData(v - R, q + (E - k), n, rt), J = e.getImageData(v, q + E, n, rt);
          D && Y(Z.data, I, F, T), X(Z.data, J.data, u), e.putImageData(J, v, q + E);
        }
      }
      function ct(l, e, n, p) {
        const o = p[0], a = p[1], u = p[2] - o, v = p[3] - a;
        u === 0 || v === 0 || (ot(e.context, n, u, v, e.subtype, e.backdrop, e.transferMap, o, a, e.offsetX, e.offsetY), l.save(), l.globalAlpha = 1, l.globalCompositeOperation = "source-over", l.setTransform(1, 0, 0, 1, 0, 0), l.drawImage(n.canvas, 0, 0), l.restore());
      }
      function pt(l, e) {
        if (e)
          return !0;
        const n = y.Util.singularValueDecompose2dScale(l);
        n[0] = Math.fround(n[0]), n[1] = Math.fround(n[1]);
        const p = Math.fround((globalThis.devicePixelRatio || 1) * B.PixelsPerInch.PDF_TO_CSS_UNITS);
        return n[0] <= p && n[1] <= p;
      }
      const dt = ["butt", "round", "square"], ht = ["miter", "round", "bevel"], ut = {}, st = {};
      class b {
        constructor(e, n, p, o, a, {
          optionalContentConfig: u,
          markedContentStack: v = null
        }, E, R) {
          this.ctx = e, this.current = new K(this.ctx.canvas.width, this.ctx.canvas.height), this.stateStack = [], this.pendingClip = null, this.pendingEOFill = !1, this.res = null, this.xobjs = null, this.commonObjs = n, this.objs = p, this.canvasFactory = o, this.filterFactory = a, this.groupStack = [], this.processingType3 = null, this.baseTransform = null, this.baseTransformStack = [], this.groupLevel = 0, this.smaskStack = [], this.smaskCounter = 0, this.tempSMask = null, this.suspendedCtx = null, this.contentVisible = !0, this.markedContentStack = v || [], this.optionalContentConfig = u, this.cachedCanvases = new O(this.canvasFactory), this.cachedPatterns = /* @__PURE__ */ new Map(), this.annotationCanvasMap = E, this.viewportScale = 1, this.outputScaleX = 1, this.outputScaleY = 1, this.pageColors = R, this._cachedScaleForStroking = [-1, 0], this._cachedGetSinglePixelWidth = null, this._cachedBitmapsMap = /* @__PURE__ */ new Map();
        }
        getObject(e, n = null) {
          return typeof e == "string" ? e.startsWith("g_") ? this.commonObjs.get(e) : this.objs.get(e) : n;
        }
        beginDrawing({
          transform: e,
          viewport: n,
          transparency: p = !1,
          background: o = null
        }) {
          const a = this.ctx.canvas.width, u = this.ctx.canvas.height, v = this.ctx.fillStyle;
          if (this.ctx.fillStyle = o || "#ffffff", this.ctx.fillRect(0, 0, a, u), this.ctx.fillStyle = v, p) {
            const E = this.cachedCanvases.getCanvas("transparent", a, u);
            this.compositeCtx = this.ctx, this.transparentCanvas = E.canvas, this.ctx = E.context, this.ctx.save(), this.ctx.transform(...(0, B.getCurrentTransform)(this.compositeCtx));
          }
          this.ctx.save(), G(this.ctx), e && (this.ctx.transform(...e), this.outputScaleX = e[0], this.outputScaleY = e[0]), this.ctx.transform(...n.transform), this.viewportScale = n.scale, this.baseTransform = (0, B.getCurrentTransform)(this.ctx);
        }
        executeOperatorList(e, n, p, o) {
          const a = e.argsArray, u = e.fnArray;
          let v = n || 0;
          const E = a.length;
          if (E === v)
            return v;
          const R = E - v > w && typeof p == "function", k = R ? Date.now() + f : 0;
          let D = 0;
          const I = this.commonObjs, F = this.objs;
          let T;
          for (; ; ) {
            if (o !== void 0 && v === o.nextBreakPoint)
              return o.breakIt(v, p), v;
            if (T = u[v], T !== y.OPS.dependency)
              this[T].apply(this, a[v]);
            else
              for (const X of a[v]) {
                const Q = X.startsWith("g_") ? I : F;
                if (!Q.has(X))
                  return Q.get(X, p), v;
              }
            if (v++, v === E)
              return v;
            if (R && ++D > w) {
              if (Date.now() > k)
                return p(), v;
              D = 0;
            }
          }
        }
        #t() {
          for (; this.stateStack.length || this.inSMaskMode; )
            this.restore();
          this.ctx.restore(), this.transparentCanvas && (this.ctx = this.compositeCtx, this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.drawImage(this.transparentCanvas, 0, 0), this.ctx.restore(), this.transparentCanvas = null);
        }
        endDrawing() {
          this.#t(), this.cachedCanvases.clear(), this.cachedPatterns.clear();
          for (const e of this._cachedBitmapsMap.values()) {
            for (const n of e.values())
              typeof HTMLCanvasElement < "u" && n instanceof HTMLCanvasElement && (n.width = n.height = 0);
            e.clear();
          }
          this._cachedBitmapsMap.clear(), this.#e();
        }
        #e() {
          if (this.pageColors) {
            const e = this.filterFactory.addHCMFilter(this.pageColors.foreground, this.pageColors.background);
            if (e !== "none") {
              const n = this.ctx.filter;
              this.ctx.filter = e, this.ctx.drawImage(this.ctx.canvas, 0, 0), this.ctx.filter = n;
            }
          }
        }
        _scaleImage(e, n) {
          const p = e.width, o = e.height;
          let a = Math.max(Math.hypot(n[0], n[1]), 1), u = Math.max(Math.hypot(n[2], n[3]), 1), v = p, E = o, R = "prescale1", k, D;
          for (; a > 2 && v > 1 || u > 2 && E > 1; ) {
            let I = v, F = E;
            a > 2 && v > 1 && (I = v >= 16384 ? Math.floor(v / 2) - 1 || 1 : Math.ceil(v / 2), a /= v / I), u > 2 && E > 1 && (F = E >= 16384 ? Math.floor(E / 2) - 1 || 1 : Math.ceil(E) / 2, u /= E / F), k = this.cachedCanvases.getCanvas(R, I, F), D = k.context, D.clearRect(0, 0, I, F), D.drawImage(e, 0, 0, v, E, 0, 0, I, F), e = k.canvas, v = I, E = F, R = R === "prescale1" ? "prescale2" : "prescale1";
          }
          return {
            img: e,
            paintWidth: v,
            paintHeight: E
          };
        }
        _createMaskCanvas(e) {
          const n = this.ctx, {
            width: p,
            height: o
          } = e, a = this.current.fillColor, u = this.current.patternFill, v = (0, B.getCurrentTransform)(n);
          let E, R, k, D;
          if ((e.bitmap || e.data) && e.count > 1) {
            const gt = e.bitmap || e.data.buffer;
            R = JSON.stringify(u ? v : [v.slice(0, 4), a]), E = this._cachedBitmapsMap.get(gt), E || (E = /* @__PURE__ */ new Map(), this._cachedBitmapsMap.set(gt, E));
            const bt = E.get(R);
            if (bt && !u) {
              const At = Math.round(Math.min(v[0], v[2]) + v[4]), mt = Math.round(Math.min(v[1], v[3]) + v[5]);
              return {
                canvas: bt,
                offsetX: At,
                offsetY: mt
              };
            }
            k = bt;
          }
          k || (D = this.cachedCanvases.getCanvas("maskCanvas", p, o), j(D.context, e));
          let I = y.Util.transform(v, [1 / p, 0, 0, -1 / o, 0, 0]);
          I = y.Util.transform(I, [1, 0, 0, 1, 0, -o]);
          const [F, T, X, Q] = y.Util.getAxialAlignedBoundingBox([0, 0, p, o], I), $ = Math.round(X - F) || 1, q = Math.round(Q - T) || 1, rt = this.cachedCanvases.getCanvas("fillCanvas", $, q), Z = rt.context, J = F, it = T;
          Z.translate(-J, -it), Z.transform(...I), k || (k = this._scaleImage(D.canvas, (0, B.getCurrentTransformInverse)(Z)), k = k.img, E && u && E.set(R, k)), Z.imageSmoothingEnabled = pt((0, B.getCurrentTransform)(Z), e.interpolate), _(Z, k, 0, 0, k.width, k.height, 0, 0, p, o), Z.globalCompositeOperation = "source-in";
          const lt = y.Util.transform((0, B.getCurrentTransformInverse)(Z), [1, 0, 0, 1, -J, -it]);
          return Z.fillStyle = u ? a.getPattern(n, this, lt, N.FILL) : a, Z.fillRect(0, 0, p, o), E && !u && (this.cachedCanvases.delete("fillCanvas"), E.set(R, rt.canvas)), {
            canvas: rt.canvas,
            offsetX: Math.round(J),
            offsetY: Math.round(it)
          };
        }
        setLineWidth(e) {
          e !== this.current.lineWidth && (this._cachedScaleForStroking[0] = -1), this.current.lineWidth = e, this.ctx.lineWidth = e;
        }
        setLineCap(e) {
          this.ctx.lineCap = dt[e];
        }
        setLineJoin(e) {
          this.ctx.lineJoin = ht[e];
        }
        setMiterLimit(e) {
          this.ctx.miterLimit = e;
        }
        setDash(e, n) {
          const p = this.ctx;
          p.setLineDash !== void 0 && (p.setLineDash(e), p.lineDashOffset = n);
        }
        setRenderingIntent(e) {
        }
        setFlatness(e) {
        }
        setGState(e) {
          for (const [n, p] of e)
            switch (n) {
              case "LW":
                this.setLineWidth(p);
                break;
              case "LC":
                this.setLineCap(p);
                break;
              case "LJ":
                this.setLineJoin(p);
                break;
              case "ML":
                this.setMiterLimit(p);
                break;
              case "D":
                this.setDash(p[0], p[1]);
                break;
              case "RI":
                this.setRenderingIntent(p);
                break;
              case "FL":
                this.setFlatness(p);
                break;
              case "Font":
                this.setFont(p[0], p[1]);
                break;
              case "CA":
                this.current.strokeAlpha = p;
                break;
              case "ca":
                this.current.fillAlpha = p, this.ctx.globalAlpha = p;
                break;
              case "BM":
                this.ctx.globalCompositeOperation = p;
                break;
              case "SMask":
                this.current.activeSMask = p ? this.tempSMask : null, this.tempSMask = null, this.checkSMaskState();
                break;
              case "TR":
                this.ctx.filter = this.current.transferMaps = this.filterFactory.addFilter(p);
                break;
            }
        }
        get inSMaskMode() {
          return !!this.suspendedCtx;
        }
        checkSMaskState() {
          const e = this.inSMaskMode;
          this.current.activeSMask && !e ? this.beginSMaskMode() : !this.current.activeSMask && e && this.endSMaskMode();
        }
        beginSMaskMode() {
          if (this.inSMaskMode)
            throw new Error("beginSMaskMode called while already in smask mode");
          const e = this.ctx.canvas.width, n = this.ctx.canvas.height, p = "smaskGroupAt" + this.groupLevel, o = this.cachedCanvases.getCanvas(p, e, n);
          this.suspendedCtx = this.ctx, this.ctx = o.context;
          const a = this.ctx;
          a.setTransform(...(0, B.getCurrentTransform)(this.suspendedCtx)), H(this.suspendedCtx, a), M(a, this.suspendedCtx), this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]);
        }
        endSMaskMode() {
          if (!this.inSMaskMode)
            throw new Error("endSMaskMode called while not in smask mode");
          this.ctx._removeMirroring(), H(this.ctx, this.suspendedCtx), this.ctx = this.suspendedCtx, this.suspendedCtx = null;
        }
        compose(e) {
          if (!this.current.activeSMask)
            return;
          e ? (e[0] = Math.floor(e[0]), e[1] = Math.floor(e[1]), e[2] = Math.ceil(e[2]), e[3] = Math.ceil(e[3])) : e = [0, 0, this.ctx.canvas.width, this.ctx.canvas.height];
          const n = this.current.activeSMask, p = this.suspendedCtx;
          ct(p, n, this.ctx, e), this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height), this.ctx.restore();
        }
        save() {
          this.inSMaskMode ? (H(this.ctx, this.suspendedCtx), this.suspendedCtx.save()) : this.ctx.save();
          const e = this.current;
          this.stateStack.push(e), this.current = e.clone();
        }
        restore() {
          this.stateStack.length === 0 && this.inSMaskMode && this.endSMaskMode(), this.stateStack.length !== 0 && (this.current = this.stateStack.pop(), this.inSMaskMode ? (this.suspendedCtx.restore(), H(this.suspendedCtx, this.ctx)) : this.ctx.restore(), this.checkSMaskState(), this.pendingClip = null, this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null);
        }
        transform(e, n, p, o, a, u) {
          this.ctx.transform(e, n, p, o, a, u), this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null;
        }
        constructPath(e, n, p) {
          const o = this.ctx, a = this.current;
          let u = a.x, v = a.y, E, R;
          const k = (0, B.getCurrentTransform)(o), D = k[0] === 0 && k[3] === 0 || k[1] === 0 && k[2] === 0, I = D ? p.slice(0) : null;
          for (let F = 0, T = 0, X = e.length; F < X; F++)
            switch (e[F] | 0) {
              case y.OPS.rectangle:
                u = n[T++], v = n[T++];
                const Q = n[T++], $ = n[T++], q = u + Q, rt = v + $;
                o.moveTo(u, v), Q === 0 || $ === 0 ? o.lineTo(q, rt) : (o.lineTo(q, v), o.lineTo(q, rt), o.lineTo(u, rt)), D || a.updateRectMinMax(k, [u, v, q, rt]), o.closePath();
                break;
              case y.OPS.moveTo:
                u = n[T++], v = n[T++], o.moveTo(u, v), D || a.updatePathMinMax(k, u, v);
                break;
              case y.OPS.lineTo:
                u = n[T++], v = n[T++], o.lineTo(u, v), D || a.updatePathMinMax(k, u, v);
                break;
              case y.OPS.curveTo:
                E = u, R = v, u = n[T + 4], v = n[T + 5], o.bezierCurveTo(n[T], n[T + 1], n[T + 2], n[T + 3], u, v), a.updateCurvePathMinMax(k, E, R, n[T], n[T + 1], n[T + 2], n[T + 3], u, v, I), T += 6;
                break;
              case y.OPS.curveTo2:
                E = u, R = v, o.bezierCurveTo(u, v, n[T], n[T + 1], n[T + 2], n[T + 3]), a.updateCurvePathMinMax(k, E, R, u, v, n[T], n[T + 1], n[T + 2], n[T + 3], I), u = n[T + 2], v = n[T + 3], T += 4;
                break;
              case y.OPS.curveTo3:
                E = u, R = v, u = n[T + 2], v = n[T + 3], o.bezierCurveTo(n[T], n[T + 1], u, v, u, v), a.updateCurvePathMinMax(k, E, R, n[T], n[T + 1], u, v, u, v, I), T += 4;
                break;
              case y.OPS.closePath:
                o.closePath();
                break;
            }
          D && a.updateScalingPathMinMax(k, I), a.setCurrentPoint(u, v);
        }
        closePath() {
          this.ctx.closePath();
        }
        stroke(e = !0) {
          const n = this.ctx, p = this.current.strokeColor;
          n.globalAlpha = this.current.strokeAlpha, this.contentVisible && (typeof p == "object" && p?.getPattern ? (n.save(), n.strokeStyle = p.getPattern(n, this, (0, B.getCurrentTransformInverse)(n), N.STROKE), this.rescaleAndStroke(!1), n.restore()) : this.rescaleAndStroke(!0)), e && this.consumePath(this.current.getClippedPathBoundingBox()), n.globalAlpha = this.current.fillAlpha;
        }
        closeStroke() {
          this.closePath(), this.stroke();
        }
        fill(e = !0) {
          const n = this.ctx, p = this.current.fillColor, o = this.current.patternFill;
          let a = !1;
          o && (n.save(), n.fillStyle = p.getPattern(n, this, (0, B.getCurrentTransformInverse)(n), N.FILL), a = !0);
          const u = this.current.getClippedPathBoundingBox();
          this.contentVisible && u !== null && (this.pendingEOFill ? (n.fill("evenodd"), this.pendingEOFill = !1) : n.fill()), a && n.restore(), e && this.consumePath(u);
        }
        eoFill() {
          this.pendingEOFill = !0, this.fill();
        }
        fillStroke() {
          this.fill(!1), this.stroke(!1), this.consumePath();
        }
        eoFillStroke() {
          this.pendingEOFill = !0, this.fillStroke();
        }
        closeFillStroke() {
          this.closePath(), this.fillStroke();
        }
        closeEOFillStroke() {
          this.pendingEOFill = !0, this.closePath(), this.fillStroke();
        }
        endPath() {
          this.consumePath();
        }
        clip() {
          this.pendingClip = ut;
        }
        eoClip() {
          this.pendingClip = st;
        }
        beginText() {
          this.current.textMatrix = y.IDENTITY_MATRIX, this.current.textMatrixScale = 1, this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0;
        }
        endText() {
          const e = this.pendingTextPaths, n = this.ctx;
          if (e === void 0) {
            n.beginPath();
            return;
          }
          n.save(), n.beginPath();
          for (const p of e)
            n.setTransform(...p.transform), n.translate(p.x, p.y), p.addToPath(n, p.fontSize);
          n.restore(), n.clip(), n.beginPath(), delete this.pendingTextPaths;
        }
        setCharSpacing(e) {
          this.current.charSpacing = e;
        }
        setWordSpacing(e) {
          this.current.wordSpacing = e;
        }
        setHScale(e) {
          this.current.textHScale = e / 100;
        }
        setLeading(e) {
          this.current.leading = -e;
        }
        setFont(e, n) {
          const p = this.commonObjs.get(e), o = this.current;
          if (!p)
            throw new Error(`Can't find font for ${e}`);
          if (o.fontMatrix = p.fontMatrix || y.FONT_IDENTITY_MATRIX, (o.fontMatrix[0] === 0 || o.fontMatrix[3] === 0) && (0, y.warn)("Invalid font matrix for font " + e), n < 0 ? (n = -n, o.fontDirection = -1) : o.fontDirection = 1, this.current.font = p, this.current.fontSize = n, p.isType3Font)
            return;
          const a = p.loadedName || "sans-serif", u = p.systemFontInfo?.css || `"${a}", ${p.fallbackName}`;
          let v = "normal";
          p.black ? v = "900" : p.bold && (v = "bold");
          const E = p.italic ? "italic" : "normal";
          let R = n;
          n < t ? R = t : n > i && (R = i), this.current.fontSizeScale = n / R, this.ctx.font = `${E} ${v} ${R}px ${u}`;
        }
        setTextRenderingMode(e) {
          this.current.textRenderingMode = e;
        }
        setTextRise(e) {
          this.current.textRise = e;
        }
        moveText(e, n) {
          this.current.x = this.current.lineX += e, this.current.y = this.current.lineY += n;
        }
        setLeadingMoveText(e, n) {
          this.setLeading(-n), this.moveText(e, n);
        }
        setTextMatrix(e, n, p, o, a, u) {
          this.current.textMatrix = [e, n, p, o, a, u], this.current.textMatrixScale = Math.hypot(e, n), this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0;
        }
        nextLine() {
          this.moveText(0, this.current.leading);
        }
        paintChar(e, n, p, o) {
          const a = this.ctx, u = this.current, v = u.font, E = u.textRenderingMode, R = u.fontSize / u.fontSizeScale, k = E & y.TextRenderingMode.FILL_STROKE_MASK, D = !!(E & y.TextRenderingMode.ADD_TO_PATH_FLAG), I = u.patternFill && !v.missingFile;
          let F;
          (v.disableFontFace || D || I) && (F = v.getPathGenerator(this.commonObjs, e)), v.disableFontFace || I ? (a.save(), a.translate(n, p), a.beginPath(), F(a, R), o && a.setTransform(...o), (k === y.TextRenderingMode.FILL || k === y.TextRenderingMode.FILL_STROKE) && a.fill(), (k === y.TextRenderingMode.STROKE || k === y.TextRenderingMode.FILL_STROKE) && a.stroke(), a.restore()) : ((k === y.TextRenderingMode.FILL || k === y.TextRenderingMode.FILL_STROKE) && a.fillText(e, n, p), (k === y.TextRenderingMode.STROKE || k === y.TextRenderingMode.FILL_STROKE) && a.strokeText(e, n, p)), D && (this.pendingTextPaths ||= []).push({
            transform: (0, B.getCurrentTransform)(a),
            x: n,
            y: p,
            fontSize: R,
            addToPath: F
          });
        }
        get isFontSubpixelAAEnabled() {
          const {
            context: e
          } = this.cachedCanvases.getCanvas("isFontSubpixelAAEnabled", 10, 10);
          e.scale(1.5, 1), e.fillText("I", 0, 10);
          const n = e.getImageData(0, 0, 10, 10).data;
          let p = !1;
          for (let o = 3; o < n.length; o += 4)
            if (n[o] > 0 && n[o] < 255) {
              p = !0;
              break;
            }
          return (0, y.shadow)(this, "isFontSubpixelAAEnabled", p);
        }
        showText(e) {
          const n = this.current, p = n.font;
          if (p.isType3Font)
            return this.showType3Text(e);
          const o = n.fontSize;
          if (o === 0)
            return;
          const a = this.ctx, u = n.fontSizeScale, v = n.charSpacing, E = n.wordSpacing, R = n.fontDirection, k = n.textHScale * R, D = e.length, I = p.vertical, F = I ? 1 : -1, T = p.defaultVMetrics, X = o * n.fontMatrix[0], Q = n.textRenderingMode === y.TextRenderingMode.FILL && !p.disableFontFace && !n.patternFill;
          a.save(), a.transform(...n.textMatrix), a.translate(n.x, n.y + n.textRise), R > 0 ? a.scale(k, -1) : a.scale(k, 1);
          let $;
          if (n.patternFill) {
            a.save();
            const it = n.fillColor.getPattern(a, this, (0, B.getCurrentTransformInverse)(a), N.FILL);
            $ = (0, B.getCurrentTransform)(a), a.restore(), a.fillStyle = it;
          }
          let q = n.lineWidth;
          const rt = n.textMatrixScale;
          if (rt === 0 || q === 0) {
            const it = n.textRenderingMode & y.TextRenderingMode.FILL_STROKE_MASK;
            (it === y.TextRenderingMode.STROKE || it === y.TextRenderingMode.FILL_STROKE) && (q = this.getSinglePixelWidth());
          } else
            q /= rt;
          if (u !== 1 && (a.scale(u, u), q /= u), a.lineWidth = q, p.isInvalidPDFjsFont) {
            const it = [];
            let lt = 0;
            for (const gt of e)
              it.push(gt.unicode), lt += gt.width;
            a.fillText(it.join(""), 0, 0), n.x += lt * X * k, a.restore(), this.compose();
            return;
          }
          let Z = 0, J;
          for (J = 0; J < D; ++J) {
            const it = e[J];
            if (typeof it == "number") {
              Z += F * it * o / 1e3;
              continue;
            }
            let lt = !1;
            const gt = (it.isSpace ? E : 0) + v, bt = it.fontChar, At = it.accent;
            let mt, Ct, St = it.width;
            if (I) {
              const vt = it.vmetric || T, Et = -(it.vmetric ? vt[1] : St * 0.5) * X, Rt = vt[2] * X;
              St = vt ? -vt[0] : St, mt = Et / u, Ct = (Z + Rt) / u;
            } else
              mt = Z / u, Ct = 0;
            if (p.remeasure && St > 0) {
              const vt = a.measureText(bt).width * 1e3 / o * u;
              if (St < vt && this.isFontSubpixelAAEnabled) {
                const Et = St / vt;
                lt = !0, a.save(), a.scale(Et, 1), mt /= Et;
              } else St !== vt && (mt += (St - vt) / 2e3 * o / u);
            }
            if (this.contentVisible && (it.isInFont || p.missingFile)) {
              if (Q && !At)
                a.fillText(bt, mt, Ct);
              else if (this.paintChar(bt, mt, Ct, $), At) {
                const vt = mt + o * At.offset.x / u, Et = Ct - o * At.offset.y / u;
                this.paintChar(At.fontChar, vt, Et, $);
              }
            }
            const Tt = I ? St * X - gt * R : St * X + gt * R;
            Z += Tt, lt && a.restore();
          }
          I ? n.y -= Z : n.x += Z * k, a.restore(), this.compose();
        }
        showType3Text(e) {
          const n = this.ctx, p = this.current, o = p.font, a = p.fontSize, u = p.fontDirection, v = o.vertical ? 1 : -1, E = p.charSpacing, R = p.wordSpacing, k = p.textHScale * u, D = p.fontMatrix || y.FONT_IDENTITY_MATRIX, I = e.length, F = p.textRenderingMode === y.TextRenderingMode.INVISIBLE;
          let T, X, Q, $;
          if (!(F || a === 0)) {
            for (this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null, n.save(), n.transform(...p.textMatrix), n.translate(p.x, p.y), n.scale(k, u), T = 0; T < I; ++T) {
              if (X = e[T], typeof X == "number") {
                $ = v * X * a / 1e3, this.ctx.translate($, 0), p.x += $ * k;
                continue;
              }
              const q = (X.isSpace ? R : 0) + E, rt = o.charProcOperatorList[X.operatorListId];
              if (!rt) {
                (0, y.warn)(`Type3 character "${X.operatorListId}" is not available.`);
                continue;
              }
              this.contentVisible && (this.processingType3 = X, this.save(), n.scale(a, a), n.transform(...D), this.executeOperatorList(rt), this.restore()), Q = y.Util.applyTransform([X.width, 0], D)[0] * a + q, n.translate(Q, 0), p.x += Q * k;
            }
            n.restore(), this.processingType3 = null;
          }
        }
        setCharWidth(e, n) {
        }
        setCharWidthAndBounds(e, n, p, o, a, u) {
          this.ctx.rect(p, o, a - p, u - o), this.ctx.clip(), this.endPath();
        }
        getColorN_Pattern(e) {
          let n;
          if (e[0] === "TilingPattern") {
            const p = e[1], o = this.baseTransform || (0, B.getCurrentTransform)(this.ctx), a = {
              createCanvasGraphics: (u) => new b(u, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, {
                optionalContentConfig: this.optionalContentConfig,
                markedContentStack: this.markedContentStack
              })
            };
            n = new s(e, p, this.ctx, a, o);
          } else
            n = this._getPattern(e[1], e[2]);
          return n;
        }
        setStrokeColorN() {
          this.current.strokeColor = this.getColorN_Pattern(arguments);
        }
        setFillColorN() {
          this.current.fillColor = this.getColorN_Pattern(arguments), this.current.patternFill = !0;
        }
        setStrokeRGBColor(e, n, p) {
          const o = y.Util.makeHexColor(e, n, p);
          this.ctx.strokeStyle = o, this.current.strokeColor = o;
        }
        setFillRGBColor(e, n, p) {
          const o = y.Util.makeHexColor(e, n, p);
          this.ctx.fillStyle = o, this.current.fillColor = o, this.current.patternFill = !1;
        }
        _getPattern(e, n = null) {
          let p;
          return this.cachedPatterns.has(e) ? p = this.cachedPatterns.get(e) : (p = c(this.getObject(e)), this.cachedPatterns.set(e, p)), n && (p.matrix = n), p;
        }
        shadingFill(e) {
          if (!this.contentVisible)
            return;
          const n = this.ctx;
          this.save();
          const p = this._getPattern(e);
          n.fillStyle = p.getPattern(n, this, (0, B.getCurrentTransformInverse)(n), N.SHADING);
          const o = (0, B.getCurrentTransformInverse)(n);
          if (o) {
            const {
              width: a,
              height: u
            } = n.canvas, [v, E, R, k] = y.Util.getAxialAlignedBoundingBox([0, 0, a, u], o);
            this.ctx.fillRect(v, E, R - v, k - E);
          } else
            this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
          this.compose(this.current.getClippedPathBoundingBox()), this.restore();
        }
        beginInlineImage() {
          (0, y.unreachable)("Should not call beginInlineImage");
        }
        beginImageData() {
          (0, y.unreachable)("Should not call beginImageData");
        }
        paintFormXObjectBegin(e, n) {
          if (this.contentVisible && (this.save(), this.baseTransformStack.push(this.baseTransform), Array.isArray(e) && e.length === 6 && this.transform(...e), this.baseTransform = (0, B.getCurrentTransform)(this.ctx), n)) {
            const p = n[2] - n[0], o = n[3] - n[1];
            this.ctx.rect(n[0], n[1], p, o), this.current.updateRectMinMax((0, B.getCurrentTransform)(this.ctx), n), this.clip(), this.endPath();
          }
        }
        paintFormXObjectEnd() {
          this.contentVisible && (this.restore(), this.baseTransform = this.baseTransformStack.pop());
        }
        beginGroup(e) {
          if (!this.contentVisible)
            return;
          this.save(), this.inSMaskMode && (this.endSMaskMode(), this.current.activeSMask = null);
          const n = this.ctx;
          e.isolated || (0, y.info)("TODO: Support non-isolated groups."), e.knockout && (0, y.warn)("Knockout groups not supported.");
          const p = (0, B.getCurrentTransform)(n);
          if (e.matrix && n.transform(...e.matrix), !e.bbox)
            throw new Error("Bounding box is required.");
          let o = y.Util.getAxialAlignedBoundingBox(e.bbox, (0, B.getCurrentTransform)(n));
          const a = [0, 0, n.canvas.width, n.canvas.height];
          o = y.Util.intersect(o, a) || [0, 0, 0, 0];
          const u = Math.floor(o[0]), v = Math.floor(o[1]);
          let E = Math.max(Math.ceil(o[2]) - u, 1), R = Math.max(Math.ceil(o[3]) - v, 1), k = 1, D = 1;
          E > h && (k = E / h, E = h), R > h && (D = R / h, R = h), this.current.startNewPathAndClipBox([0, 0, E, R]);
          let I = "groupAt" + this.groupLevel;
          e.smask && (I += "_smask_" + this.smaskCounter++ % 2);
          const F = this.cachedCanvases.getCanvas(I, E, R), T = F.context;
          T.scale(1 / k, 1 / D), T.translate(-u, -v), T.transform(...p), e.smask ? this.smaskStack.push({
            canvas: F.canvas,
            context: T,
            offsetX: u,
            offsetY: v,
            scaleX: k,
            scaleY: D,
            subtype: e.smask.subtype,
            backdrop: e.smask.backdrop,
            transferMap: e.smask.transferMap || null,
            startTransformInverse: null
          }) : (n.setTransform(1, 0, 0, 1, 0, 0), n.translate(u, v), n.scale(k, D), n.save()), H(n, T), this.ctx = T, this.setGState([["BM", "source-over"], ["ca", 1], ["CA", 1]]), this.groupStack.push(n), this.groupLevel++;
        }
        endGroup(e) {
          if (!this.contentVisible)
            return;
          this.groupLevel--;
          const n = this.ctx, p = this.groupStack.pop();
          if (this.ctx = p, this.ctx.imageSmoothingEnabled = !1, e.smask)
            this.tempSMask = this.smaskStack.pop(), this.restore();
          else {
            this.ctx.restore();
            const o = (0, B.getCurrentTransform)(this.ctx);
            this.restore(), this.ctx.save(), this.ctx.setTransform(...o);
            const a = y.Util.getAxialAlignedBoundingBox([0, 0, n.canvas.width, n.canvas.height], o);
            this.ctx.drawImage(n.canvas, 0, 0), this.ctx.restore(), this.compose(a);
          }
        }
        beginAnnotation(e, n, p, o, a) {
          if (this.#t(), G(this.ctx), this.ctx.save(), this.save(), this.baseTransform && this.ctx.setTransform(...this.baseTransform), Array.isArray(n) && n.length === 4) {
            const u = n[2] - n[0], v = n[3] - n[1];
            if (a && this.annotationCanvasMap) {
              p = p.slice(), p[4] -= n[0], p[5] -= n[1], n = n.slice(), n[0] = n[1] = 0, n[2] = u, n[3] = v;
              const [E, R] = y.Util.singularValueDecompose2dScale((0, B.getCurrentTransform)(this.ctx)), {
                viewportScale: k
              } = this, D = Math.ceil(u * this.outputScaleX * k), I = Math.ceil(v * this.outputScaleY * k);
              this.annotationCanvas = this.canvasFactory.create(D, I);
              const {
                canvas: F,
                context: T
              } = this.annotationCanvas;
              this.annotationCanvasMap.set(e, F), this.annotationCanvas.savedCtx = this.ctx, this.ctx = T, this.ctx.save(), this.ctx.setTransform(E, 0, 0, -R, 0, v * R), G(this.ctx);
            } else
              G(this.ctx), this.ctx.rect(n[0], n[1], u, v), this.ctx.clip(), this.endPath();
          }
          this.current = new K(this.ctx.canvas.width, this.ctx.canvas.height), this.transform(...p), this.transform(...o);
        }
        endAnnotation() {
          this.annotationCanvas && (this.ctx.restore(), this.#e(), this.ctx = this.annotationCanvas.savedCtx, delete this.annotationCanvas.savedCtx, delete this.annotationCanvas);
        }
        paintImageMaskXObject(e) {
          if (!this.contentVisible)
            return;
          const n = e.count;
          e = this.getObject(e.data, e), e.count = n;
          const p = this.ctx, o = this.processingType3;
          if (o && (o.compiled === void 0 && (o.compiled = z(e)), o.compiled)) {
            o.compiled(p);
            return;
          }
          const a = this._createMaskCanvas(e), u = a.canvas;
          p.save(), p.setTransform(1, 0, 0, 1, 0, 0), p.drawImage(u, a.offsetX, a.offsetY), p.restore(), this.compose();
        }
        paintImageMaskXObjectRepeat(e, n, p = 0, o = 0, a, u) {
          if (!this.contentVisible)
            return;
          e = this.getObject(e.data, e);
          const v = this.ctx;
          v.save();
          const E = (0, B.getCurrentTransform)(v);
          v.transform(n, p, o, a, 0, 0);
          const R = this._createMaskCanvas(e);
          v.setTransform(1, 0, 0, 1, R.offsetX - E[4], R.offsetY - E[5]);
          for (let k = 0, D = u.length; k < D; k += 2) {
            const I = y.Util.transform(E, [n, p, o, a, u[k], u[k + 1]]), [F, T] = y.Util.applyTransform([0, 0], I);
            v.drawImage(R.canvas, F, T);
          }
          v.restore(), this.compose();
        }
        paintImageMaskXObjectGroup(e) {
          if (!this.contentVisible)
            return;
          const n = this.ctx, p = this.current.fillColor, o = this.current.patternFill;
          for (const a of e) {
            const {
              data: u,
              width: v,
              height: E,
              transform: R
            } = a, k = this.cachedCanvases.getCanvas("maskCanvas", v, E), D = k.context;
            D.save();
            const I = this.getObject(u, a);
            j(D, I), D.globalCompositeOperation = "source-in", D.fillStyle = o ? p.getPattern(D, this, (0, B.getCurrentTransformInverse)(n), N.FILL) : p, D.fillRect(0, 0, v, E), D.restore(), n.save(), n.transform(...R), n.scale(1, -1), _(n, k.canvas, 0, 0, v, E, 0, -1, 1, 1), n.restore();
          }
          this.compose();
        }
        paintImageXObject(e) {
          if (!this.contentVisible)
            return;
          const n = this.getObject(e);
          if (!n) {
            (0, y.warn)("Dependent image isn't ready yet");
            return;
          }
          this.paintInlineImageXObject(n);
        }
        paintImageXObjectRepeat(e, n, p, o) {
          if (!this.contentVisible)
            return;
          const a = this.getObject(e);
          if (!a) {
            (0, y.warn)("Dependent image isn't ready yet");
            return;
          }
          const u = a.width, v = a.height, E = [];
          for (let R = 0, k = o.length; R < k; R += 2)
            E.push({
              transform: [n, 0, 0, p, o[R], o[R + 1]],
              x: 0,
              y: 0,
              w: u,
              h: v
            });
          this.paintInlineImageXObjectGroup(a, E);
        }
        applyTransferMapsToCanvas(e) {
          return this.current.transferMaps !== "none" && (e.filter = this.current.transferMaps, e.drawImage(e.canvas, 0, 0), e.filter = "none"), e.canvas;
        }
        applyTransferMapsToBitmap(e) {
          if (this.current.transferMaps === "none")
            return e.bitmap;
          const {
            bitmap: n,
            width: p,
            height: o
          } = e, a = this.cachedCanvases.getCanvas("inlineImage", p, o), u = a.context;
          return u.filter = this.current.transferMaps, u.drawImage(n, 0, 0), u.filter = "none", a.canvas;
        }
        paintInlineImageXObject(e) {
          if (!this.contentVisible)
            return;
          const n = e.width, p = e.height, o = this.ctx;
          if (this.save(), !y.isNodeJS) {
            const {
              filter: v
            } = o;
            v !== "none" && v !== "" && (o.filter = "none");
          }
          o.scale(1 / n, -1 / p);
          let a;
          if (e.bitmap)
            a = this.applyTransferMapsToBitmap(e);
          else if (typeof HTMLElement == "function" && e instanceof HTMLElement || !e.data)
            a = e;
          else {
            const E = this.cachedCanvases.getCanvas("inlineImage", n, p).context;
            nt(E, e), a = this.applyTransferMapsToCanvas(E);
          }
          const u = this._scaleImage(a, (0, B.getCurrentTransformInverse)(o));
          o.imageSmoothingEnabled = pt((0, B.getCurrentTransform)(o), e.interpolate), _(o, u.img, 0, 0, u.paintWidth, u.paintHeight, 0, -p, n, p), this.compose(), this.restore();
        }
        paintInlineImageXObjectGroup(e, n) {
          if (!this.contentVisible)
            return;
          const p = this.ctx;
          let o;
          if (e.bitmap)
            o = e.bitmap;
          else {
            const a = e.width, u = e.height, E = this.cachedCanvases.getCanvas("inlineImage", a, u).context;
            nt(E, e), o = this.applyTransferMapsToCanvas(E);
          }
          for (const a of n)
            p.save(), p.transform(...a.transform), p.scale(1, -1), _(p, o, a.x, a.y, a.w, a.h, 0, -1, 1, 1), p.restore();
          this.compose();
        }
        paintSolidColorImageMask() {
          this.contentVisible && (this.ctx.fillRect(0, 0, 1, 1), this.compose());
        }
        markPoint(e) {
        }
        markPointProps(e, n) {
        }
        beginMarkedContent(e) {
          this.markedContentStack.push({
            visible: !0
          });
        }
        beginMarkedContentProps(e, n) {
          e === "OC" ? this.markedContentStack.push({
            visible: this.optionalContentConfig.isVisible(n)
          }) : this.markedContentStack.push({
            visible: !0
          }), this.contentVisible = this.isContentVisible();
        }
        endMarkedContent() {
          this.markedContentStack.pop(), this.contentVisible = this.isContentVisible();
        }
        beginCompat() {
        }
        endCompat() {
        }
        consumePath(e) {
          const n = this.current.isEmptyClip();
          this.pendingClip && this.current.updateClipFromPath(), this.pendingClip || this.compose(e);
          const p = this.ctx;
          this.pendingClip && (n || (this.pendingClip === st ? p.clip("evenodd") : p.clip()), this.pendingClip = null), this.current.startNewPathAndClipBox(this.current.clipBox), p.beginPath();
        }
        getSinglePixelWidth() {
          if (!this._cachedGetSinglePixelWidth) {
            const e = (0, B.getCurrentTransform)(this.ctx);
            if (e[1] === 0 && e[2] === 0)
              this._cachedGetSinglePixelWidth = 1 / Math.min(Math.abs(e[0]), Math.abs(e[3]));
            else {
              const n = Math.abs(e[0] * e[3] - e[2] * e[1]), p = Math.hypot(e[0], e[2]), o = Math.hypot(e[1], e[3]);
              this._cachedGetSinglePixelWidth = Math.max(p, o) / n;
            }
          }
          return this._cachedGetSinglePixelWidth;
        }
        getScaleForStroking() {
          if (this._cachedScaleForStroking[0] === -1) {
            const {
              lineWidth: e
            } = this.current, {
              a: n,
              b: p,
              c: o,
              d: a
            } = this.ctx.getTransform();
            let u, v;
            if (p === 0 && o === 0) {
              const E = Math.abs(n), R = Math.abs(a);
              if (E === R)
                if (e === 0)
                  u = v = 1 / E;
                else {
                  const k = E * e;
                  u = v = k < 1 ? 1 / k : 1;
                }
              else if (e === 0)
                u = 1 / E, v = 1 / R;
              else {
                const k = E * e, D = R * e;
                u = k < 1 ? 1 / k : 1, v = D < 1 ? 1 / D : 1;
              }
            } else {
              const E = Math.abs(n * a - p * o), R = Math.hypot(n, p), k = Math.hypot(o, a);
              if (e === 0)
                u = k / E, v = R / E;
              else {
                const D = e * E;
                u = k > D ? k / D : 1, v = R > D ? R / D : 1;
              }
            }
            this._cachedScaleForStroking[0] = u, this._cachedScaleForStroking[1] = v;
          }
          return this._cachedScaleForStroking;
        }
        rescaleAndStroke(e) {
          const {
            ctx: n
          } = this, {
            lineWidth: p
          } = this.current, [o, a] = this.getScaleForStroking();
          if (n.lineWidth = p || 1, o === 1 && a === 1) {
            n.stroke();
            return;
          }
          const u = n.getLineDash();
          if (e && n.save(), n.scale(o, a), u.length > 0) {
            const v = Math.max(o, a);
            n.setLineDash(u.map((E) => E / v)), n.lineDashOffset /= v;
          }
          n.stroke(), e && n.restore();
        }
        isContentVisible() {
          for (let e = this.markedContentStack.length - 1; e >= 0; e--)
            if (!this.markedContentStack[e].visible)
              return !1;
          return !0;
        }
      }
      for (const l in y.OPS)
        b.prototype[l] !== void 0 && (b.prototype[y.OPS[l]] = b.prototype[l]);
    }
  ),
  /***/
  419: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        DOMCMapReaderFactory: () => (
          /* binding */
          A
        ),
        /* harmony export */
        DOMCanvasFactory: () => (
          /* binding */
          C
        ),
        /* harmony export */
        DOMFilterFactory: () => (
          /* binding */
          L
        ),
        /* harmony export */
        DOMSVGFactory: () => (
          /* binding */
          d
        ),
        /* harmony export */
        DOMStandardFontDataFactory: () => (
          /* binding */
          r
        ),
        /* harmony export */
        PDFDateString: () => (
          /* binding */
          P
        ),
        /* harmony export */
        PageViewport: () => (
          /* binding */
          c
        ),
        /* harmony export */
        PixelsPerInch: () => (
          /* binding */
          U
        ),
        /* harmony export */
        RenderingCancelledException: () => (
          /* binding */
          m
        ),
        /* harmony export */
        StatTimer: () => (
          /* binding */
          h
        ),
        /* harmony export */
        fetchData: () => (
          /* binding */
          x
        ),
        /* harmony export */
        getColorValues: () => (
          /* binding */
          _
        ),
        /* harmony export */
        getCurrentTransform: () => (
          /* binding */
          z
        ),
        /* harmony export */
        getCurrentTransformInverse: () => (
          /* binding */
          K
        ),
        /* harmony export */
        getFilenameFromUrl: () => (
          /* binding */
          t
        ),
        /* harmony export */
        getPdfFilenameFromUrl: () => (
          /* binding */
          i
        ),
        /* harmony export */
        getRGB: () => (
          /* binding */
          O
        ),
        /* harmony export */
        getXfaPageViewport: () => (
          /* binding */
          M
        ),
        /* harmony export */
        isDataScheme: () => (
          /* binding */
          s
        ),
        /* harmony export */
        isPdfFile: () => (
          /* binding */
          g
        ),
        /* harmony export */
        isValidFetchUrl: () => (
          /* binding */
          f
        ),
        /* harmony export */
        noContextMenu: () => (
          /* binding */
          w
        ),
        /* harmony export */
        setLayerDimensions: () => (
          /* binding */
          nt
        )
        /* harmony export */
      });
      var y = V(583), B = V(292);
      const N = "http://www.w3.org/2000/svg";
      class U {
        static CSS = 96;
        static PDF = 72;
        static PDF_TO_CSS_UNITS = this.CSS / this.PDF;
      }
      class L extends y.BaseFilterFactory {
        #t;
        #e;
        #s;
        #n;
        #r;
        #i = 0;
        constructor({
          docId: H,
          ownerDocument: G = globalThis.document
        } = {}) {
          super(), this.#s = H, this.#n = G;
        }
        get #a() {
          return this.#t ||= /* @__PURE__ */ new Map();
        }
        get #l() {
          return this.#r ||= /* @__PURE__ */ new Map();
        }
        get #h() {
          if (!this.#e) {
            const H = this.#n.createElement("div"), {
              style: G
            } = H;
            G.visibility = "hidden", G.contain = "strict", G.width = G.height = 0, G.position = "absolute", G.top = G.left = 0, G.zIndex = -1;
            const Y = this.#n.createElementNS(N, "svg");
            Y.setAttribute("width", 0), Y.setAttribute("height", 0), this.#e = this.#n.createElementNS(N, "defs"), H.append(Y), Y.append(this.#e), this.#n.body.append(H);
          }
          return this.#e;
        }
        addFilter(H) {
          if (!H)
            return "none";
          let G = this.#a.get(H);
          if (G)
            return G;
          let Y, et, tt, ot;
          if (H.length === 1) {
            const ht = H[0], ut = new Array(256);
            for (let st = 0; st < 256; st++)
              ut[st] = ht[st] / 255;
            ot = Y = et = tt = ut.join(",");
          } else {
            const [ht, ut, st] = H, b = new Array(256), l = new Array(256), e = new Array(256);
            for (let n = 0; n < 256; n++)
              b[n] = ht[n] / 255, l[n] = ut[n] / 255, e[n] = st[n] / 255;
            Y = b.join(","), et = l.join(","), tt = e.join(","), ot = `${Y}${et}${tt}`;
          }
          if (G = this.#a.get(ot), G)
            return this.#a.set(H, G), G;
          const ct = `g_${this.#s}_transfer_map_${this.#i++}`, pt = `url(#${ct})`;
          this.#a.set(H, pt), this.#a.set(ot, pt);
          const dt = this.#u(ct);
          return this.#o(Y, et, tt, dt), pt;
        }
        addHCMFilter(H, G) {
          const Y = `${H}-${G}`, et = "base";
          let tt = this.#l.get(et);
          if (tt?.key === Y || (tt ? (tt.filter?.remove(), tt.key = Y, tt.url = "none", tt.filter = null) : (tt = {
            key: Y,
            url: "none",
            filter: null
          }, this.#l.set(et, tt)), !H || !G))
            return tt.url;
          const ot = this.#p(H);
          H = B.Util.makeHexColor(...ot);
          const ct = this.#p(G);
          if (G = B.Util.makeHexColor(...ct), this.#h.style.color = "", H === "#000000" && G === "#ffffff" || H === G)
            return tt.url;
          const pt = new Array(256);
          for (let b = 0; b <= 255; b++) {
            const l = b / 255;
            pt[b] = l <= 0.03928 ? l / 12.92 : ((l + 0.055) / 1.055) ** 2.4;
          }
          const dt = pt.join(","), ht = `g_${this.#s}_hcm_filter`, ut = tt.filter = this.#u(ht);
          this.#o(dt, dt, dt, ut), this.#d(ut);
          const st = (b, l) => {
            const e = ot[b] / 255, n = ct[b] / 255, p = new Array(l + 1);
            for (let o = 0; o <= l; o++)
              p[o] = e + o / l * (n - e);
            return p.join(",");
          };
          return this.#o(st(0, 5), st(1, 5), st(2, 5), ut), tt.url = `url(#${ht})`, tt.url;
        }
        addHighlightHCMFilter(H, G, Y, et, tt) {
          const ot = `${G}-${Y}-${et}-${tt}`;
          let ct = this.#l.get(H);
          if (ct?.key === ot || (ct ? (ct.filter?.remove(), ct.key = ot, ct.url = "none", ct.filter = null) : (ct = {
            key: ot,
            url: "none",
            filter: null
          }, this.#l.set(H, ct)), !G || !Y))
            return ct.url;
          const [pt, dt] = [G, Y].map(this.#p.bind(this));
          let ht = Math.round(0.2126 * pt[0] + 0.7152 * pt[1] + 0.0722 * pt[2]), ut = Math.round(0.2126 * dt[0] + 0.7152 * dt[1] + 0.0722 * dt[2]), [st, b] = [et, tt].map(this.#p.bind(this));
          ut < ht && ([ht, ut, st, b] = [ut, ht, b, st]), this.#h.style.color = "";
          const l = (p, o, a) => {
            const u = new Array(256), v = (ut - ht) / a, E = p / 255, R = (o - p) / (255 * a);
            let k = 0;
            for (let D = 0; D <= a; D++) {
              const I = Math.round(ht + D * v), F = E + D * R;
              for (let T = k; T <= I; T++)
                u[T] = F;
              k = I + 1;
            }
            for (let D = k; D < 256; D++)
              u[D] = u[k - 1];
            return u.join(",");
          }, e = `g_${this.#s}_hcm_${H}_filter`, n = ct.filter = this.#u(e);
          return this.#d(n), this.#o(l(st[0], b[0], 5), l(st[1], b[1], 5), l(st[2], b[2], 5), n), ct.url = `url(#${e})`, ct.url;
        }
        destroy(H = !1) {
          H && this.#l.size !== 0 || (this.#e && (this.#e.parentNode.parentNode.remove(), this.#e = null), this.#t && (this.#t.clear(), this.#t = null), this.#i = 0);
        }
        #d(H) {
          const G = this.#n.createElementNS(N, "feColorMatrix");
          G.setAttribute("type", "matrix"), G.setAttribute("values", "0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0"), H.append(G);
        }
        #u(H) {
          const G = this.#n.createElementNS(N, "filter");
          return G.setAttribute("color-interpolation-filters", "sRGB"), G.setAttribute("id", H), this.#h.append(G), G;
        }
        #c(H, G, Y) {
          const et = this.#n.createElementNS(N, G);
          et.setAttribute("type", "discrete"), et.setAttribute("tableValues", Y), H.append(et);
        }
        #o(H, G, Y, et) {
          const tt = this.#n.createElementNS(N, "feComponentTransfer");
          et.append(tt), this.#c(tt, "feFuncR", H), this.#c(tt, "feFuncG", G), this.#c(tt, "feFuncB", Y);
        }
        #p(H) {
          return this.#h.style.color = H, O(getComputedStyle(this.#h).getPropertyValue("color"));
        }
      }
      class C extends y.BaseCanvasFactory {
        constructor({
          ownerDocument: H = globalThis.document
        } = {}) {
          super(), this._document = H;
        }
        _createCanvas(H, G) {
          const Y = this._document.createElement("canvas");
          return Y.width = H, Y.height = G, Y;
        }
      }
      async function x(j, H = "text") {
        if (f(j, document.baseURI)) {
          const G = await fetch(j);
          if (!G.ok)
            throw new Error(G.statusText);
          switch (H) {
            case "arraybuffer":
              return G.arrayBuffer();
            case "blob":
              return G.blob();
            case "json":
              return G.json();
          }
          return G.text();
        }
        return new Promise((G, Y) => {
          const et = new XMLHttpRequest();
          et.open("GET", j, !0), et.responseType = H, et.onreadystatechange = () => {
            if (et.readyState === XMLHttpRequest.DONE) {
              if (et.status === 200 || et.status === 0) {
                switch (H) {
                  case "arraybuffer":
                  case "blob":
                  case "json":
                    G(et.response);
                    return;
                }
                G(et.responseText);
                return;
              }
              Y(new Error(et.statusText));
            }
          }, et.send(null);
        });
      }
      class A extends y.BaseCMapReaderFactory {
        _fetchData(H, G) {
          return x(H, this.isCompressed ? "arraybuffer" : "text").then((Y) => ({
            cMapData: Y instanceof ArrayBuffer ? new Uint8Array(Y) : (0, B.stringToBytes)(Y),
            compressionType: G
          }));
        }
      }
      class r extends y.BaseStandardFontDataFactory {
        _fetchData(H) {
          return x(H, "arraybuffer").then((G) => new Uint8Array(G));
        }
      }
      class d extends y.BaseSVGFactory {
        _createSVG(H) {
          return document.createElementNS(N, H);
        }
      }
      class c {
        constructor({
          viewBox: H,
          scale: G,
          rotation: Y,
          offsetX: et = 0,
          offsetY: tt = 0,
          dontFlip: ot = !1
        }) {
          this.viewBox = H, this.scale = G, this.rotation = Y, this.offsetX = et, this.offsetY = tt;
          const ct = (H[2] + H[0]) / 2, pt = (H[3] + H[1]) / 2;
          let dt, ht, ut, st;
          switch (Y %= 360, Y < 0 && (Y += 360), Y) {
            case 180:
              dt = -1, ht = 0, ut = 0, st = 1;
              break;
            case 90:
              dt = 0, ht = 1, ut = 1, st = 0;
              break;
            case 270:
              dt = 0, ht = -1, ut = -1, st = 0;
              break;
            case 0:
              dt = 1, ht = 0, ut = 0, st = -1;
              break;
            default:
              throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
          }
          ot && (ut = -ut, st = -st);
          let b, l, e, n;
          dt === 0 ? (b = Math.abs(pt - H[1]) * G + et, l = Math.abs(ct - H[0]) * G + tt, e = (H[3] - H[1]) * G, n = (H[2] - H[0]) * G) : (b = Math.abs(ct - H[0]) * G + et, l = Math.abs(pt - H[1]) * G + tt, e = (H[2] - H[0]) * G, n = (H[3] - H[1]) * G), this.transform = [dt * G, ht * G, ut * G, st * G, b - dt * G * ct - ut * G * pt, l - ht * G * ct - st * G * pt], this.width = e, this.height = n;
        }
        get rawDims() {
          const {
            viewBox: H
          } = this;
          return (0, B.shadow)(this, "rawDims", {
            pageWidth: H[2] - H[0],
            pageHeight: H[3] - H[1],
            pageX: H[0],
            pageY: H[1]
          });
        }
        clone({
          scale: H = this.scale,
          rotation: G = this.rotation,
          offsetX: Y = this.offsetX,
          offsetY: et = this.offsetY,
          dontFlip: tt = !1
        } = {}) {
          return new c({
            viewBox: this.viewBox.slice(),
            scale: H,
            rotation: G,
            offsetX: Y,
            offsetY: et,
            dontFlip: tt
          });
        }
        convertToViewportPoint(H, G) {
          return B.Util.applyTransform([H, G], this.transform);
        }
        convertToViewportRectangle(H) {
          const G = B.Util.applyTransform([H[0], H[1]], this.transform), Y = B.Util.applyTransform([H[2], H[3]], this.transform);
          return [G[0], G[1], Y[0], Y[1]];
        }
        convertToPdfPoint(H, G) {
          return B.Util.applyInverseTransform([H, G], this.transform);
        }
      }
      class m extends B.BaseException {
        constructor(H, G = 0) {
          super(H, "RenderingCancelledException"), this.extraDelay = G;
        }
      }
      function s(j) {
        const H = j.length;
        let G = 0;
        for (; G < H && j[G].trim() === ""; )
          G++;
        return j.substring(G, G + 5).toLowerCase() === "data:";
      }
      function g(j) {
        return typeof j == "string" && /\.pdf$/i.test(j);
      }
      function t(j, H = !1) {
        return H || ([j] = j.split(/[#?]/, 1)), j.substring(j.lastIndexOf("/") + 1);
      }
      function i(j, H = "document.pdf") {
        if (typeof j != "string")
          return H;
        if (s(j))
          return (0, B.warn)('getPdfFilenameFromUrl: ignore "data:"-URL for performance reasons.'), H;
        const G = /^(?:(?:[^:]+:)?\/\/[^/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/, Y = /[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i, et = G.exec(j);
        let tt = Y.exec(et[1]) || Y.exec(et[2]) || Y.exec(et[3]);
        if (tt && (tt = tt[0], tt.includes("%")))
          try {
            tt = Y.exec(decodeURIComponent(tt))[0];
          } catch {
          }
        return tt || H;
      }
      class h {
        started = /* @__PURE__ */ Object.create(null);
        times = [];
        time(H) {
          H in this.started && (0, B.warn)(`Timer is already running for ${H}`), this.started[H] = Date.now();
        }
        timeEnd(H) {
          H in this.started || (0, B.warn)(`Timer has not been started for ${H}`), this.times.push({
            name: H,
            start: this.started[H],
            end: Date.now()
          }), delete this.started[H];
        }
        toString() {
          const H = [];
          let G = 0;
          for (const {
            name: Y
          } of this.times)
            G = Math.max(Y.length, G);
          for (const {
            name: Y,
            start: et,
            end: tt
          } of this.times)
            H.push(`${Y.padEnd(G)} ${tt - et}ms
`);
          return H.join("");
        }
      }
      function f(j, H) {
        try {
          const {
            protocol: G
          } = H ? new URL(j, H) : new URL(j);
          return G === "http:" || G === "https:";
        } catch {
          return !1;
        }
      }
      function w(j) {
        j.preventDefault();
      }
      let S;
      class P {
        static toDateObject(H) {
          if (!H || typeof H != "string")
            return null;
          S ||= new RegExp("^D:(\\d{4})(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?([Z|+|-])?(\\d{2})?'?(\\d{2})?'?");
          const G = S.exec(H);
          if (!G)
            return null;
          const Y = parseInt(G[1], 10);
          let et = parseInt(G[2], 10);
          et = et >= 1 && et <= 12 ? et - 1 : 0;
          let tt = parseInt(G[3], 10);
          tt = tt >= 1 && tt <= 31 ? tt : 1;
          let ot = parseInt(G[4], 10);
          ot = ot >= 0 && ot <= 23 ? ot : 0;
          let ct = parseInt(G[5], 10);
          ct = ct >= 0 && ct <= 59 ? ct : 0;
          let pt = parseInt(G[6], 10);
          pt = pt >= 0 && pt <= 59 ? pt : 0;
          const dt = G[7] || "Z";
          let ht = parseInt(G[8], 10);
          ht = ht >= 0 && ht <= 23 ? ht : 0;
          let ut = parseInt(G[9], 10) || 0;
          return ut = ut >= 0 && ut <= 59 ? ut : 0, dt === "-" ? (ot += ht, ct += ut) : dt === "+" && (ot -= ht, ct -= ut), new Date(Date.UTC(Y, et, tt, ot, ct, pt));
        }
      }
      function M(j, {
        scale: H = 1,
        rotation: G = 0
      }) {
        const {
          width: Y,
          height: et
        } = j.attributes.style, tt = [0, 0, parseInt(Y), parseInt(et)];
        return new c({
          viewBox: tt,
          scale: H,
          rotation: G
        });
      }
      function O(j) {
        if (j.startsWith("#")) {
          const H = parseInt(j.slice(1), 16);
          return [(H & 16711680) >> 16, (H & 65280) >> 8, H & 255];
        }
        return j.startsWith("rgb(") ? j.slice(4, -1).split(",").map((H) => parseInt(H)) : j.startsWith("rgba(") ? j.slice(5, -1).split(",").map((H) => parseInt(H)).slice(0, 3) : ((0, B.warn)(`Not a valid color format: "${j}"`), [0, 0, 0]);
      }
      function _(j) {
        const H = document.createElement("span");
        H.style.visibility = "hidden", document.body.append(H);
        for (const G of j.keys()) {
          H.style.color = G;
          const Y = window.getComputedStyle(H).color;
          j.set(G, O(Y));
        }
        H.remove();
      }
      function z(j) {
        const {
          a: H,
          b: G,
          c: Y,
          d: et,
          e: tt,
          f: ot
        } = j.getTransform();
        return [H, G, Y, et, tt, ot];
      }
      function K(j) {
        const {
          a: H,
          b: G,
          c: Y,
          d: et,
          e: tt,
          f: ot
        } = j.getTransform().invertSelf();
        return [H, G, Y, et, tt, ot];
      }
      function nt(j, H, G = !1, Y = !0) {
        if (H instanceof c) {
          const {
            pageWidth: et,
            pageHeight: tt
          } = H.rawDims, {
            style: ot
          } = j, ct = B.FeatureTest.isCSSRoundSupported, pt = `var(--scale-factor) * ${et}px`, dt = `var(--scale-factor) * ${tt}px`, ht = ct ? `round(${pt}, 1px)` : `calc(${pt})`, ut = ct ? `round(${dt}, 1px)` : `calc(${dt})`;
          !G || H.rotation % 180 === 0 ? (ot.width = ht, ot.height = ut) : (ot.width = ut, ot.height = ht);
        }
        Y && j.setAttribute("data-main-rotation", H.rotation);
      }
    }
  ),
  /***/
  47: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        DrawLayer: () => (
          /* binding */
          N
        )
        /* harmony export */
      });
      var y = V(419), B = V(292);
      class N {
        #t = null;
        #e = 0;
        #s = /* @__PURE__ */ new Map();
        #n = /* @__PURE__ */ new Map();
        constructor({
          pageIndex: L
        }) {
          this.pageIndex = L;
        }
        setParent(L) {
          if (!this.#t) {
            this.#t = L;
            return;
          }
          if (this.#t !== L) {
            if (this.#s.size > 0)
              for (const C of this.#s.values())
                C.remove(), L.append(C);
            this.#t = L;
          }
        }
        static get _svgFactory() {
          return (0, B.shadow)(this, "_svgFactory", new y.DOMSVGFactory());
        }
        static #r(L, {
          x: C = 0,
          y: x = 0,
          width: A = 1,
          height: r = 1
        } = {}) {
          const {
            style: d
          } = L;
          d.top = `${100 * x}%`, d.left = `${100 * C}%`, d.width = `${100 * A}%`, d.height = `${100 * r}%`;
        }
        #i(L) {
          const C = N._svgFactory.create(1, 1, !0);
          return this.#t.append(C), C.setAttribute("aria-hidden", !0), N.#r(C, L), C;
        }
        #a(L, C) {
          const x = N._svgFactory.createElement("clipPath");
          L.append(x);
          const A = `clip_${C}`;
          x.setAttribute("id", A), x.setAttribute("clipPathUnits", "objectBoundingBox");
          const r = N._svgFactory.createElement("use");
          return x.append(r), r.setAttribute("href", `#${C}`), r.classList.add("clip"), A;
        }
        highlight(L, C, x, A = !1) {
          const r = this.#e++, d = this.#i(L.box);
          d.classList.add("highlight"), L.free && d.classList.add("free");
          const c = N._svgFactory.createElement("defs");
          d.append(c);
          const m = N._svgFactory.createElement("path");
          c.append(m);
          const s = `path_p${this.pageIndex}_${r}`;
          m.setAttribute("id", s), m.setAttribute("d", L.toSVGPath()), A && this.#n.set(r, m);
          const g = this.#a(c, s), t = N._svgFactory.createElement("use");
          return d.append(t), d.setAttribute("fill", C), d.setAttribute("fill-opacity", x), t.setAttribute("href", `#${s}`), this.#s.set(r, d), {
            id: r,
            clipPathId: `url(#${g})`
          };
        }
        highlightOutline(L) {
          const C = this.#e++, x = this.#i(L.box);
          x.classList.add("highlightOutline");
          const A = N._svgFactory.createElement("defs");
          x.append(A);
          const r = N._svgFactory.createElement("path");
          A.append(r);
          const d = `path_p${this.pageIndex}_${C}`;
          r.setAttribute("id", d), r.setAttribute("d", L.toSVGPath()), r.setAttribute("vector-effect", "non-scaling-stroke");
          let c;
          if (L.free) {
            x.classList.add("free");
            const g = N._svgFactory.createElement("mask");
            A.append(g), c = `mask_p${this.pageIndex}_${C}`, g.setAttribute("id", c), g.setAttribute("maskUnits", "objectBoundingBox");
            const t = N._svgFactory.createElement("rect");
            g.append(t), t.setAttribute("width", "1"), t.setAttribute("height", "1"), t.setAttribute("fill", "white");
            const i = N._svgFactory.createElement("use");
            g.append(i), i.setAttribute("href", `#${d}`), i.setAttribute("stroke", "none"), i.setAttribute("fill", "black"), i.setAttribute("fill-rule", "nonzero"), i.classList.add("mask");
          }
          const m = N._svgFactory.createElement("use");
          x.append(m), m.setAttribute("href", `#${d}`), c && m.setAttribute("mask", `url(#${c})`);
          const s = m.cloneNode();
          return x.append(s), m.classList.add("mainOutline"), s.classList.add("secondaryOutline"), this.#s.set(C, x), C;
        }
        finalizeLine(L, C) {
          const x = this.#n.get(L);
          this.#n.delete(L), this.updateBox(L, C.box), x.setAttribute("d", C.toSVGPath());
        }
        updateLine(L, C) {
          this.#s.get(L).firstChild.firstChild.setAttribute("d", C.toSVGPath());
        }
        removeFreeHighlight(L) {
          this.remove(L), this.#n.delete(L);
        }
        updatePath(L, C) {
          this.#n.get(L).setAttribute("d", C.toSVGPath());
        }
        updateBox(L, C) {
          N.#r(this.#s.get(L), C);
        }
        show(L, C) {
          this.#s.get(L).classList.toggle("hidden", !C);
        }
        rotate(L, C) {
          this.#s.get(L).setAttribute("data-main-rotation", C);
        }
        changeColor(L, C) {
          this.#s.get(L).setAttribute("fill", C);
        }
        changeOpacity(L, C) {
          this.#s.get(L).setAttribute("fill-opacity", C);
        }
        addClass(L, C) {
          this.#s.get(L).classList.add(C);
        }
        removeClass(L, C) {
          this.#s.get(L).classList.remove(C);
        }
        remove(L) {
          this.#t !== null && (this.#s.get(L).remove(), this.#s.delete(L));
        }
        destroy() {
          this.#t = null;
          for (const L of this.#s.values())
            L.remove();
          this.#s.clear();
        }
      }
    }
  ),
  /***/
  731: (
    /***/
    (at, W, V) => {
      V.d(W, {
        AnnotationEditorLayer: () => (
          /* binding */
          s
        )
      });
      var y = V(292), B = V(310), N = V(830), U = V(976);
      const L = /\r\n?|\n/g;
      class C extends B.AnnotationEditor {
        #t = this.editorDivBlur.bind(this);
        #e = this.editorDivFocus.bind(this);
        #s = this.editorDivInput.bind(this);
        #n = this.editorDivKeydown.bind(this);
        #r = this.editorDivPaste.bind(this);
        #i;
        #a = "";
        #l = `${this.id}-editor`;
        #h;
        #d = null;
        static _freeTextDefaultContent = "";
        static _internalPadding = 0;
        static _defaultColor = null;
        static _defaultFontSize = 10;
        static get _keyboardManager() {
          const t = C.prototype, i = (w) => w.isEmpty(), h = N.AnnotationEditorUIManager.TRANSLATE_SMALL, f = N.AnnotationEditorUIManager.TRANSLATE_BIG;
          return (0, y.shadow)(this, "_keyboardManager", new N.KeyboardManager([[["ctrl+s", "mac+meta+s", "ctrl+p", "mac+meta+p"], t.commitOrRemove, {
            bubbles: !0
          }], [["ctrl+Enter", "mac+meta+Enter", "Escape", "mac+Escape"], t.commitOrRemove], [["ArrowLeft", "mac+ArrowLeft"], t._translateEmpty, {
            args: [-h, 0],
            checker: i
          }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], t._translateEmpty, {
            args: [-f, 0],
            checker: i
          }], [["ArrowRight", "mac+ArrowRight"], t._translateEmpty, {
            args: [h, 0],
            checker: i
          }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], t._translateEmpty, {
            args: [f, 0],
            checker: i
          }], [["ArrowUp", "mac+ArrowUp"], t._translateEmpty, {
            args: [0, -h],
            checker: i
          }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], t._translateEmpty, {
            args: [0, -f],
            checker: i
          }], [["ArrowDown", "mac+ArrowDown"], t._translateEmpty, {
            args: [0, h],
            checker: i
          }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], t._translateEmpty, {
            args: [0, f],
            checker: i
          }]]));
        }
        static _type = "freetext";
        static _editorType = y.AnnotationEditorType.FREETEXT;
        constructor(t) {
          super({
            ...t,
            name: "freeTextEditor"
          }), this.#i = t.color || C._defaultColor || B.AnnotationEditor._defaultLineColor, this.#h = t.fontSize || C._defaultFontSize;
        }
        static initialize(t, i) {
          B.AnnotationEditor.initialize(t, i, {
            strings: ["pdfjs-free-text-default-content"]
          });
          const h = getComputedStyle(document.documentElement);
          this._internalPadding = parseFloat(h.getPropertyValue("--freetext-padding"));
        }
        static updateDefaultParams(t, i) {
          switch (t) {
            case y.AnnotationEditorParamsType.FREETEXT_SIZE:
              C._defaultFontSize = i;
              break;
            case y.AnnotationEditorParamsType.FREETEXT_COLOR:
              C._defaultColor = i;
              break;
          }
        }
        updateParams(t, i) {
          switch (t) {
            case y.AnnotationEditorParamsType.FREETEXT_SIZE:
              this.#u(i);
              break;
            case y.AnnotationEditorParamsType.FREETEXT_COLOR:
              this.#c(i);
              break;
          }
        }
        static get defaultPropertiesToUpdate() {
          return [[y.AnnotationEditorParamsType.FREETEXT_SIZE, C._defaultFontSize], [y.AnnotationEditorParamsType.FREETEXT_COLOR, C._defaultColor || B.AnnotationEditor._defaultLineColor]];
        }
        get propertiesToUpdate() {
          return [[y.AnnotationEditorParamsType.FREETEXT_SIZE, this.#h], [y.AnnotationEditorParamsType.FREETEXT_COLOR, this.#i]];
        }
        #u(t) {
          const i = (f) => {
            this.editorDiv.style.fontSize = `calc(${f}px * var(--scale-factor))`, this.translate(0, -(f - this.#h) * this.parentScale), this.#h = f, this.#p();
          }, h = this.#h;
          this.addCommands({
            cmd: i.bind(this, t),
            undo: i.bind(this, h),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: y.AnnotationEditorParamsType.FREETEXT_SIZE,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }
        #c(t) {
          const i = (f) => {
            this.#i = this.editorDiv.style.color = f;
          }, h = this.#i;
          this.addCommands({
            cmd: i.bind(this, t),
            undo: i.bind(this, h),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: y.AnnotationEditorParamsType.FREETEXT_COLOR,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }
        _translateEmpty(t, i) {
          this._uiManager.translateSelectedEditors(t, i, !0);
        }
        getInitialTranslation() {
          const t = this.parentScale;
          return [-C._internalPadding * t, -(C._internalPadding + this.#h) * t];
        }
        rebuild() {
          this.parent && (super.rebuild(), this.div !== null && (this.isAttachedToDOM || this.parent.add(this)));
        }
        enableEditMode() {
          this.isInEditMode() || (this.parent.setEditingState(!1), this.parent.updateToolbar(y.AnnotationEditorType.FREETEXT), super.enableEditMode(), this.overlayDiv.classList.remove("enabled"), this.editorDiv.contentEditable = !0, this._isDraggable = !1, this.div.removeAttribute("aria-activedescendant"), this.editorDiv.addEventListener("keydown", this.#n), this.editorDiv.addEventListener("focus", this.#e), this.editorDiv.addEventListener("blur", this.#t), this.editorDiv.addEventListener("input", this.#s), this.editorDiv.addEventListener("paste", this.#r));
        }
        disableEditMode() {
          this.isInEditMode() && (this.parent.setEditingState(!0), super.disableEditMode(), this.overlayDiv.classList.add("enabled"), this.editorDiv.contentEditable = !1, this.div.setAttribute("aria-activedescendant", this.#l), this._isDraggable = !0, this.editorDiv.removeEventListener("keydown", this.#n), this.editorDiv.removeEventListener("focus", this.#e), this.editorDiv.removeEventListener("blur", this.#t), this.editorDiv.removeEventListener("input", this.#s), this.editorDiv.removeEventListener("paste", this.#r), this.div.focus({
            preventScroll: !0
          }), this.isEditing = !1, this.parent.div.classList.add("freetextEditing"));
        }
        focusin(t) {
          this._focusEventsAllowed && (super.focusin(t), t.target !== this.editorDiv && this.editorDiv.focus());
        }
        onceAdded() {
          this.width || (this.enableEditMode(), this.editorDiv.focus(), this._initialOptions?.isCentered && this.center(), this._initialOptions = null);
        }
        isEmpty() {
          return !this.editorDiv || this.editorDiv.innerText.trim() === "";
        }
        remove() {
          this.isEditing = !1, this.parent && (this.parent.setEditingState(!0), this.parent.div.classList.add("freetextEditing")), super.remove();
        }
        #o() {
          const t = [];
          this.editorDiv.normalize();
          for (const i of this.editorDiv.childNodes)
            t.push(C.#g(i));
          return t.join(`
`);
        }
        #p() {
          const [t, i] = this.parentDimensions;
          let h;
          if (this.isAttachedToDOM)
            h = this.div.getBoundingClientRect();
          else {
            const {
              currentLayer: f,
              div: w
            } = this, S = w.style.display, P = w.classList.contains("hidden");
            w.classList.remove("hidden"), w.style.display = "hidden", f.div.append(this.div), h = w.getBoundingClientRect(), w.remove(), w.style.display = S, w.classList.toggle("hidden", P);
          }
          this.rotation % 180 === this.parentRotation % 180 ? (this.width = h.width / t, this.height = h.height / i) : (this.width = h.height / t, this.height = h.width / i), this.fixAndSetPosition();
        }
        commit() {
          if (!this.isInEditMode())
            return;
          super.commit(), this.disableEditMode();
          const t = this.#a, i = this.#a = this.#o().trimEnd();
          if (t === i)
            return;
          const h = (f) => {
            if (this.#a = f, !f) {
              this.remove();
              return;
            }
            this.#f(), this._uiManager.rebuild(this), this.#p();
          };
          this.addCommands({
            cmd: () => {
              h(i);
            },
            undo: () => {
              h(t);
            },
            mustExec: !1
          }), this.#p();
        }
        shouldGetKeyboardEvents() {
          return this.isInEditMode();
        }
        enterInEditMode() {
          this.enableEditMode(), this.editorDiv.focus();
        }
        dblclick(t) {
          this.enterInEditMode();
        }
        keydown(t) {
          t.target === this.div && t.key === "Enter" && (this.enterInEditMode(), t.preventDefault());
        }
        editorDivKeydown(t) {
          C._keyboardManager.exec(this, t);
        }
        editorDivFocus(t) {
          this.isEditing = !0;
        }
        editorDivBlur(t) {
          this.isEditing = !1;
        }
        editorDivInput(t) {
          this.parent.div.classList.toggle("freetextEditing", this.isEmpty());
        }
        disableEditing() {
          this.editorDiv.setAttribute("role", "comment"), this.editorDiv.removeAttribute("aria-multiline");
        }
        enableEditing() {
          this.editorDiv.setAttribute("role", "textbox"), this.editorDiv.setAttribute("aria-multiline", !0);
        }
        render() {
          if (this.div)
            return this.div;
          let t, i;
          this.width && (t = this.x, i = this.y), super.render(), this.editorDiv = document.createElement("div"), this.editorDiv.className = "internal", this.editorDiv.setAttribute("id", this.#l), this.editorDiv.setAttribute("data-l10n-id", "pdfjs-free-text"), this.enableEditing(), B.AnnotationEditor._l10nPromise.get("pdfjs-free-text-default-content").then((f) => this.editorDiv?.setAttribute("default-content", f)), this.editorDiv.contentEditable = !0;
          const {
            style: h
          } = this.editorDiv;
          if (h.fontSize = `calc(${this.#h}px * var(--scale-factor))`, h.color = this.#i, this.div.append(this.editorDiv), this.overlayDiv = document.createElement("div"), this.overlayDiv.classList.add("overlay", "enabled"), this.div.append(this.overlayDiv), (0, N.bindEvents)(this, this.div, ["dblclick", "keydown"]), this.width) {
            const [f, w] = this.parentDimensions;
            if (this.annotationElementId) {
              const {
                position: S
              } = this.#d;
              let [P, M] = this.getInitialTranslation();
              [P, M] = this.pageTranslationToScreen(P, M);
              const [O, _] = this.pageDimensions, [z, K] = this.pageTranslation;
              let nt, j;
              switch (this.rotation) {
                case 0:
                  nt = t + (S[0] - z) / O, j = i + this.height - (S[1] - K) / _;
                  break;
                case 90:
                  nt = t + (S[0] - z) / O, j = i - (S[1] - K) / _, [P, M] = [M, -P];
                  break;
                case 180:
                  nt = t - this.width + (S[0] - z) / O, j = i - (S[1] - K) / _, [P, M] = [-P, -M];
                  break;
                case 270:
                  nt = t + (S[0] - z - this.height * _) / O, j = i + (S[1] - K - this.width * O) / _, [P, M] = [-M, P];
                  break;
              }
              this.setAt(nt * f, j * w, P, M);
            } else
              this.setAt(t * f, i * w, this.width * f, this.height * w);
            this.#f(), this._isDraggable = !0, this.editorDiv.contentEditable = !1;
          } else
            this._isDraggable = !1, this.editorDiv.contentEditable = !0;
          return this.div;
        }
        static #g(t) {
          return (t.nodeType === Node.TEXT_NODE ? t.nodeValue : t.innerText).replaceAll(L, "");
        }
        editorDivPaste(t) {
          const i = t.clipboardData || window.clipboardData, {
            types: h
          } = i;
          if (h.length === 1 && h[0] === "text/plain")
            return;
          t.preventDefault();
          const f = C.#m(i.getData("text") || "").replaceAll(L, `
`);
          if (!f)
            return;
          const w = window.getSelection();
          if (!w.rangeCount)
            return;
          this.editorDiv.normalize(), w.deleteFromDocument();
          const S = w.getRangeAt(0);
          if (!f.includes(`
`)) {
            S.insertNode(document.createTextNode(f)), this.editorDiv.normalize(), w.collapseToStart();
            return;
          }
          const {
            startContainer: P,
            startOffset: M
          } = S, O = [], _ = [];
          if (P.nodeType === Node.TEXT_NODE) {
            const nt = P.parentElement;
            if (_.push(P.nodeValue.slice(M).replaceAll(L, "")), nt !== this.editorDiv) {
              let j = O;
              for (const H of this.editorDiv.childNodes) {
                if (H === nt) {
                  j = _;
                  continue;
                }
                j.push(C.#g(H));
              }
            }
            O.push(P.nodeValue.slice(0, M).replaceAll(L, ""));
          } else if (P === this.editorDiv) {
            let nt = O, j = 0;
            for (const H of this.editorDiv.childNodes)
              j++ === M && (nt = _), nt.push(C.#g(H));
          }
          this.#a = `${O.join(`
`)}${f}${_.join(`
`)}`, this.#f();
          const z = new Range();
          let K = O.reduce((nt, j) => nt + j.length, 0);
          for (const {
            firstChild: nt
          } of this.editorDiv.childNodes)
            if (nt.nodeType === Node.TEXT_NODE) {
              const j = nt.nodeValue.length;
              if (K <= j) {
                z.setStart(nt, K), z.setEnd(nt, K);
                break;
              }
              K -= j;
            }
          w.removeAllRanges(), w.addRange(z);
        }
        #f() {
          if (this.editorDiv.replaceChildren(), !!this.#a)
            for (const t of this.#a.split(`
`)) {
              const i = document.createElement("div");
              i.append(t ? document.createTextNode(t) : document.createElement("br")), this.editorDiv.append(i);
            }
        }
        #A() {
          return this.#a.replaceAll(" ", " ");
        }
        static #m(t) {
          return t.replaceAll(" ", " ");
        }
        get contentDiv() {
          return this.editorDiv;
        }
        static deserialize(t, i, h) {
          let f = null;
          if (t instanceof U.FreeTextAnnotationElement) {
            const {
              data: {
                defaultAppearanceData: {
                  fontSize: S,
                  fontColor: P
                },
                rect: M,
                rotation: O,
                id: _
              },
              textContent: z,
              textPosition: K,
              parent: {
                page: {
                  pageNumber: nt
                }
              }
            } = t;
            if (!z || z.length === 0)
              return null;
            f = t = {
              annotationType: y.AnnotationEditorType.FREETEXT,
              color: Array.from(P),
              fontSize: S,
              value: z.join(`
`),
              position: K,
              pageIndex: nt - 1,
              rect: M.slice(0),
              rotation: O,
              id: _,
              deleted: !1
            };
          }
          const w = super.deserialize(t, i, h);
          return w.#h = t.fontSize, w.#i = y.Util.makeHexColor(...t.color), w.#a = C.#m(t.value), w.annotationElementId = t.id || null, w.#d = f, w;
        }
        serialize(t = !1) {
          if (this.isEmpty())
            return null;
          if (this.deleted)
            return {
              pageIndex: this.pageIndex,
              id: this.annotationElementId,
              deleted: !0
            };
          const i = C._internalPadding * this.parentScale, h = this.getRect(i, i), f = B.AnnotationEditor._colorManager.convert(this.isAttachedToDOM ? getComputedStyle(this.editorDiv).color : this.#i), w = {
            annotationType: y.AnnotationEditorType.FREETEXT,
            color: f,
            fontSize: this.#h,
            value: this.#A(),
            pageIndex: this.pageIndex,
            rect: h,
            rotation: this.rotation,
            structTreeParentId: this._structTreeParentId
          };
          return t ? w : this.annotationElementId && !this.#v(w) ? null : (w.id = this.annotationElementId, w);
        }
        #v(t) {
          const {
            value: i,
            fontSize: h,
            color: f,
            pageIndex: w
          } = this.#d;
          return this._hasBeenMoved || t.value !== i || t.fontSize !== h || t.color.some((S, P) => S !== f[P]) || t.pageIndex !== w;
        }
        renderAnnotationElement(t) {
          const i = super.renderAnnotationElement(t);
          if (this.deleted)
            return i;
          const {
            style: h
          } = i;
          h.fontSize = `calc(${this.#h}px * var(--scale-factor))`, h.color = this.#i, i.replaceChildren();
          for (const w of this.#a.split(`
`)) {
            const S = document.createElement("div");
            S.append(w ? document.createTextNode(w) : document.createElement("br")), i.append(S);
          }
          const f = C._internalPadding * this.parentScale;
          return t.updateEdited({
            rect: this.getRect(f, f)
          }), i;
        }
        resetAnnotationElement(t) {
          super.resetAnnotationElement(t), t.resetEdited();
        }
      }
      var x = V(61), A = V(259), r = V(419);
      class d extends B.AnnotationEditor {
        #t = null;
        #e = 0;
        #s;
        #n = null;
        #r = null;
        #i = null;
        #a = null;
        #l = 0;
        #h = null;
        #d = null;
        #u = null;
        #c = !1;
        #o = this.#E.bind(this);
        #p = null;
        #g;
        #f = null;
        #A = "";
        #m;
        #v = "";
        static _defaultColor = null;
        static _defaultOpacity = 1;
        static _defaultThickness = 12;
        static _l10nPromise;
        static _type = "highlight";
        static _editorType = y.AnnotationEditorType.HIGHLIGHT;
        static _freeHighlightId = -1;
        static _freeHighlight = null;
        static _freeHighlightClipId = "";
        static get _keyboardManager() {
          const t = d.prototype;
          return (0, y.shadow)(this, "_keyboardManager", new N.KeyboardManager([[["ArrowLeft", "mac+ArrowLeft"], t._moveCaret, {
            args: [0]
          }], [["ArrowRight", "mac+ArrowRight"], t._moveCaret, {
            args: [1]
          }], [["ArrowUp", "mac+ArrowUp"], t._moveCaret, {
            args: [2]
          }], [["ArrowDown", "mac+ArrowDown"], t._moveCaret, {
            args: [3]
          }]]));
        }
        constructor(t) {
          super({
            ...t,
            name: "highlightEditor"
          }), this.color = t.color || d._defaultColor, this.#m = t.thickness || d._defaultThickness, this.#g = t.opacity || d._defaultOpacity, this.#s = t.boxes || null, this.#v = t.methodOfCreation || "", this.#A = t.text || "", this._isDraggable = !1, t.highlightId > -1 ? (this.#c = !0, this.#C(t), this.#b()) : (this.#t = t.anchorNode, this.#e = t.anchorOffset, this.#a = t.focusNode, this.#l = t.focusOffset, this.#w(), this.#b(), this.rotate(this.rotation));
        }
        get telemetryInitialData() {
          return {
            action: "added",
            type: this.#c ? "free_highlight" : "highlight",
            color: this._uiManager.highlightColorNames.get(this.color),
            thickness: this.#m,
            methodOfCreation: this.#v
          };
        }
        get telemetryFinalData() {
          return {
            type: "highlight",
            color: this._uiManager.highlightColorNames.get(this.color)
          };
        }
        static computeTelemetryFinalData(t) {
          return {
            numberOfColors: t.get("color").size
          };
        }
        #w() {
          const t = new x.Outliner(this.#s, 1e-3);
          this.#d = t.getOutlines(), {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
          } = this.#d.box;
          const i = new x.Outliner(this.#s, 25e-4, 1e-3, this._uiManager.direction === "ltr");
          this.#i = i.getOutlines();
          const {
            lastPoint: h
          } = this.#i.box;
          this.#p = [(h[0] - this.x) / this.width, (h[1] - this.y) / this.height];
        }
        #C({
          highlightOutlines: t,
          highlightId: i,
          clipPathId: h
        }) {
          this.#d = t;
          const f = 1.5;
          if (this.#i = t.getNewOutline(this.#m / 2 + f, 25e-4), i >= 0)
            this.#u = i, this.#n = h, this.parent.drawLayer.finalizeLine(i, t), this.#f = this.parent.drawLayer.highlightOutline(this.#i);
          else if (this.parent) {
            const _ = this.parent.viewport.rotation;
            this.parent.drawLayer.updateLine(this.#u, t), this.parent.drawLayer.updateBox(this.#u, d.#S(this.#d.box, (_ - this.rotation + 360) % 360)), this.parent.drawLayer.updateLine(this.#f, this.#i), this.parent.drawLayer.updateBox(this.#f, d.#S(this.#i.box, _));
          }
          const {
            x: w,
            y: S,
            width: P,
            height: M
          } = t.box;
          switch (this.rotation) {
            case 0:
              this.x = w, this.y = S, this.width = P, this.height = M;
              break;
            case 90: {
              const [_, z] = this.parentDimensions;
              this.x = S, this.y = 1 - w, this.width = P * z / _, this.height = M * _ / z;
              break;
            }
            case 180:
              this.x = 1 - w, this.y = 1 - S, this.width = P, this.height = M;
              break;
            case 270: {
              const [_, z] = this.parentDimensions;
              this.x = 1 - S, this.y = w, this.width = P * z / _, this.height = M * _ / z;
              break;
            }
          }
          const {
            lastPoint: O
          } = this.#i.box;
          this.#p = [(O[0] - w) / P, (O[1] - S) / M];
        }
        static initialize(t, i) {
          B.AnnotationEditor.initialize(t, i), d._defaultColor ||= i.highlightColors?.values().next().value || "#fff066";
        }
        static updateDefaultParams(t, i) {
          switch (t) {
            case y.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR:
              d._defaultColor = i;
              break;
            case y.AnnotationEditorParamsType.HIGHLIGHT_THICKNESS:
              d._defaultThickness = i;
              break;
          }
        }
        translateInPage(t, i) {
        }
        get toolbarPosition() {
          return this.#p;
        }
        updateParams(t, i) {
          switch (t) {
            case y.AnnotationEditorParamsType.HIGHLIGHT_COLOR:
              this.#R(i);
              break;
            case y.AnnotationEditorParamsType.HIGHLIGHT_THICKNESS:
              this.#I(i);
              break;
          }
        }
        static get defaultPropertiesToUpdate() {
          return [[y.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR, d._defaultColor], [y.AnnotationEditorParamsType.HIGHLIGHT_THICKNESS, d._defaultThickness]];
        }
        get propertiesToUpdate() {
          return [[y.AnnotationEditorParamsType.HIGHLIGHT_COLOR, this.color || d._defaultColor], [y.AnnotationEditorParamsType.HIGHLIGHT_THICKNESS, this.#m || d._defaultThickness], [y.AnnotationEditorParamsType.HIGHLIGHT_FREE, this.#c]];
        }
        #R(t) {
          const i = (f) => {
            this.color = f, this.parent?.drawLayer.changeColor(this.#u, f), this.#r?.updateColor(f);
          }, h = this.color;
          this.addCommands({
            cmd: i.bind(this, t),
            undo: i.bind(this, h),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: y.AnnotationEditorParamsType.HIGHLIGHT_COLOR,
            overwriteIfSameType: !0,
            keepUndo: !0
          }), this._reportTelemetry({
            action: "color_changed",
            color: this._uiManager.highlightColorNames.get(t)
          }, !0);
        }
        #I(t) {
          const i = this.#m, h = (f) => {
            this.#m = f, this.#P(f);
          };
          this.addCommands({
            cmd: h.bind(this, t),
            undo: h.bind(this, i),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: y.AnnotationEditorParamsType.INK_THICKNESS,
            overwriteIfSameType: !0,
            keepUndo: !0
          }), this._reportTelemetry({
            action: "thickness_changed",
            thickness: t
          }, !0);
        }
        async addEditToolbar() {
          const t = await super.addEditToolbar();
          return t ? (this._uiManager.highlightColors && (this.#r = new A.ColorPicker({
            editor: this
          }), t.addColorPicker(this.#r)), t) : null;
        }
        disableEditing() {
          super.disableEditing(), this.div.classList.toggle("disabled", !0);
        }
        enableEditing() {
          super.enableEditing(), this.div.classList.toggle("disabled", !1);
        }
        fixAndSetPosition() {
          return super.fixAndSetPosition(this.#T());
        }
        getBaseTranslation() {
          return [0, 0];
        }
        getRect(t, i) {
          return super.getRect(t, i, this.#T());
        }
        onceAdded() {
          this.parent.addUndoableEditor(this), this.div.focus();
        }
        remove() {
          this.#y(), this._reportTelemetry({
            action: "deleted"
          }), super.remove();
        }
        rebuild() {
          this.parent && (super.rebuild(), this.div !== null && (this.#b(), this.isAttachedToDOM || this.parent.add(this)));
        }
        setParent(t) {
          let i = !1;
          this.parent && !t ? this.#y() : t && (this.#b(t), i = !this.parent && this.div?.classList.contains("selectedEditor")), super.setParent(t), this.show(this._isVisible), i && this.select();
        }
        #P(t) {
          if (!this.#c)
            return;
          this.#C({
            highlightOutlines: this.#d.getNewOutline(t / 2)
          }), this.fixAndSetPosition();
          const [i, h] = this.parentDimensions;
          this.setDims(this.width * i, this.height * h);
        }
        #y() {
          this.#u === null || !this.parent || (this.parent.drawLayer.remove(this.#u), this.#u = null, this.parent.drawLayer.remove(this.#f), this.#f = null);
        }
        #b(t = this.parent) {
          this.#u === null && ({
            id: this.#u,
            clipPathId: this.#n
          } = t.drawLayer.highlight(this.#d, this.color, this.#g), this.#f = t.drawLayer.highlightOutline(this.#i), this.#h && (this.#h.style.clipPath = this.#n));
        }
        static #S({
          x: t,
          y: i,
          width: h,
          height: f
        }, w) {
          switch (w) {
            case 90:
              return {
                x: 1 - i - f,
                y: t,
                width: f,
                height: h
              };
            case 180:
              return {
                x: 1 - t - h,
                y: 1 - i - f,
                width: h,
                height: f
              };
            case 270:
              return {
                x: i,
                y: 1 - t - h,
                width: f,
                height: h
              };
          }
          return {
            x: t,
            y: i,
            width: h,
            height: f
          };
        }
        rotate(t) {
          const {
            drawLayer: i
          } = this.parent;
          let h;
          this.#c ? (t = (t - this.rotation + 360) % 360, h = d.#S(this.#d.box, t)) : h = d.#S(this, t), i.rotate(this.#u, t), i.rotate(this.#f, t), i.updateBox(this.#u, h), i.updateBox(this.#f, d.#S(this.#i.box, t));
        }
        render() {
          if (this.div)
            return this.div;
          const t = super.render();
          this.#A && (t.setAttribute("aria-label", this.#A), t.setAttribute("role", "mark")), this.#c ? t.classList.add("free") : this.div.addEventListener("keydown", this.#o);
          const i = this.#h = document.createElement("div");
          t.append(i), i.setAttribute("aria-hidden", "true"), i.className = "internal", i.style.clipPath = this.#n;
          const [h, f] = this.parentDimensions;
          return this.setDims(this.width * h, this.height * f), (0, N.bindEvents)(this, this.#h, ["pointerover", "pointerleave"]), this.enableEditing(), t;
        }
        pointerover() {
          this.parent.drawLayer.addClass(this.#f, "hovered");
        }
        pointerleave() {
          this.parent.drawLayer.removeClass(this.#f, "hovered");
        }
        #E(t) {
          d._keyboardManager.exec(this, t);
        }
        _moveCaret(t) {
          switch (this.parent.unselect(this), t) {
            case 0:
            case 2:
              this.#k(!0);
              break;
            case 1:
            case 3:
              this.#k(!1);
              break;
          }
        }
        #k(t) {
          if (!this.#t)
            return;
          const i = window.getSelection();
          t ? i.setPosition(this.#t, this.#e) : i.setPosition(this.#a, this.#l);
        }
        select() {
          super.select(), this.#f && (this.parent?.drawLayer.removeClass(this.#f, "hovered"), this.parent?.drawLayer.addClass(this.#f, "selected"));
        }
        unselect() {
          super.unselect(), this.#f && (this.parent?.drawLayer.removeClass(this.#f, "selected"), this.#c || this.#k(!1));
        }
        get _mustFixPosition() {
          return !this.#c;
        }
        show(t = this._isVisible) {
          super.show(t), this.parent && (this.parent.drawLayer.show(this.#u, t), this.parent.drawLayer.show(this.#f, t));
        }
        #T() {
          return this.#c ? this.rotation : 0;
        }
        #M() {
          if (this.#c)
            return null;
          const [t, i] = this.pageDimensions, h = this.#s, f = new Array(h.length * 8);
          let w = 0;
          for (const {
            x: S,
            y: P,
            width: M,
            height: O
          } of h) {
            const _ = S * t, z = (1 - P - O) * i;
            f[w] = f[w + 4] = _, f[w + 1] = f[w + 3] = z, f[w + 2] = f[w + 6] = _ + M * t, f[w + 5] = f[w + 7] = z + O * i, w += 8;
          }
          return f;
        }
        #F(t) {
          return this.#d.serialize(t, this.#T());
        }
        static startHighlighting(t, i, {
          target: h,
          x: f,
          y: w
        }) {
          const {
            x: S,
            y: P,
            width: M,
            height: O
          } = h.getBoundingClientRect(), _ = (j) => {
            this.#N(t, j);
          }, z = {
            capture: !0,
            passive: !1
          }, K = (j) => {
            j.preventDefault(), j.stopPropagation();
          }, nt = (j) => {
            h.removeEventListener("pointermove", _), window.removeEventListener("blur", nt), window.removeEventListener("pointerup", nt), window.removeEventListener("pointerdown", K, z), window.removeEventListener("contextmenu", r.noContextMenu), this.#L(t, j);
          };
          window.addEventListener("blur", nt), window.addEventListener("pointerup", nt), window.addEventListener("pointerdown", K, z), window.addEventListener("contextmenu", r.noContextMenu), h.addEventListener("pointermove", _), this._freeHighlight = new x.FreeOutliner({
            x: f,
            y: w
          }, [S, P, M, O], t.scale, this._defaultThickness / 2, i, 1e-3), {
            id: this._freeHighlightId,
            clipPathId: this._freeHighlightClipId
          } = t.drawLayer.highlight(this._freeHighlight, this._defaultColor, this._defaultOpacity, !0);
        }
        static #N(t, i) {
          this._freeHighlight.add(i) && t.drawLayer.updatePath(this._freeHighlightId, this._freeHighlight);
        }
        static #L(t, i) {
          this._freeHighlight.isEmpty() ? t.drawLayer.removeFreeHighlight(this._freeHighlightId) : t.createAndAddNewEditor(i, !1, {
            highlightId: this._freeHighlightId,
            highlightOutlines: this._freeHighlight.getOutlines(),
            clipPathId: this._freeHighlightClipId,
            methodOfCreation: "main_toolbar"
          }), this._freeHighlightId = -1, this._freeHighlight = null, this._freeHighlightClipId = "";
        }
        static deserialize(t, i, h) {
          const f = super.deserialize(t, i, h), {
            rect: [w, S, P, M],
            color: O,
            quadPoints: _
          } = t;
          f.color = y.Util.makeHexColor(...O), f.#g = t.opacity;
          const [z, K] = f.pageDimensions;
          f.width = (P - w) / z, f.height = (M - S) / K;
          const nt = f.#s = [];
          for (let j = 0; j < _.length; j += 8)
            nt.push({
              x: (_[4] - P) / z,
              y: (M - (1 - _[j + 5])) / K,
              width: (_[j + 2] - _[j]) / z,
              height: (_[j + 5] - _[j + 1]) / K
            });
          return f.#w(), f;
        }
        serialize(t = !1) {
          if (this.isEmpty() || t)
            return null;
          const i = this.getRect(0, 0), h = B.AnnotationEditor._colorManager.convert(this.color);
          return {
            annotationType: y.AnnotationEditorType.HIGHLIGHT,
            color: h,
            opacity: this.#g,
            thickness: this.#m,
            quadPoints: this.#M(),
            outlines: this.#F(i),
            pageIndex: this.pageIndex,
            rect: i,
            rotation: this.#T(),
            structTreeParentId: this._structTreeParentId
          };
        }
        static canCreateNewEmptyEditor() {
          return !1;
        }
      }
      class c extends B.AnnotationEditor {
        #t = 0;
        #e = 0;
        #s = this.canvasPointermove.bind(this);
        #n = this.canvasPointerleave.bind(this);
        #r = this.canvasPointerup.bind(this);
        #i = this.canvasPointerdown.bind(this);
        #a = null;
        #l = new Path2D();
        #h = !1;
        #d = !1;
        #u = !1;
        #c = null;
        #o = 0;
        #p = 0;
        #g = null;
        static _defaultColor = null;
        static _defaultOpacity = 1;
        static _defaultThickness = 1;
        static _type = "ink";
        static _editorType = y.AnnotationEditorType.INK;
        constructor(t) {
          super({
            ...t,
            name: "inkEditor"
          }), this.color = t.color || null, this.thickness = t.thickness || null, this.opacity = t.opacity || null, this.paths = [], this.bezierPath2D = [], this.allRawPaths = [], this.currentPath = [], this.scaleFactor = 1, this.translationX = this.translationY = 0, this.x = 0, this.y = 0, this._willKeepAspectRatio = !0;
        }
        static initialize(t, i) {
          B.AnnotationEditor.initialize(t, i);
        }
        static updateDefaultParams(t, i) {
          switch (t) {
            case y.AnnotationEditorParamsType.INK_THICKNESS:
              c._defaultThickness = i;
              break;
            case y.AnnotationEditorParamsType.INK_COLOR:
              c._defaultColor = i;
              break;
            case y.AnnotationEditorParamsType.INK_OPACITY:
              c._defaultOpacity = i / 100;
              break;
          }
        }
        updateParams(t, i) {
          switch (t) {
            case y.AnnotationEditorParamsType.INK_THICKNESS:
              this.#f(i);
              break;
            case y.AnnotationEditorParamsType.INK_COLOR:
              this.#A(i);
              break;
            case y.AnnotationEditorParamsType.INK_OPACITY:
              this.#m(i);
              break;
          }
        }
        static get defaultPropertiesToUpdate() {
          return [[y.AnnotationEditorParamsType.INK_THICKNESS, c._defaultThickness], [y.AnnotationEditorParamsType.INK_COLOR, c._defaultColor || B.AnnotationEditor._defaultLineColor], [y.AnnotationEditorParamsType.INK_OPACITY, Math.round(c._defaultOpacity * 100)]];
        }
        get propertiesToUpdate() {
          return [[y.AnnotationEditorParamsType.INK_THICKNESS, this.thickness || c._defaultThickness], [y.AnnotationEditorParamsType.INK_COLOR, this.color || c._defaultColor || B.AnnotationEditor._defaultLineColor], [y.AnnotationEditorParamsType.INK_OPACITY, Math.round(100 * (this.opacity ?? c._defaultOpacity))]];
        }
        #f(t) {
          const i = (f) => {
            this.thickness = f, this.#O();
          }, h = this.thickness;
          this.addCommands({
            cmd: i.bind(this, t),
            undo: i.bind(this, h),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: y.AnnotationEditorParamsType.INK_THICKNESS,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }
        #A(t) {
          const i = (f) => {
            this.color = f, this.#E();
          }, h = this.color;
          this.addCommands({
            cmd: i.bind(this, t),
            undo: i.bind(this, h),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: y.AnnotationEditorParamsType.INK_COLOR,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }
        #m(t) {
          const i = (f) => {
            this.opacity = f, this.#E();
          };
          t /= 100;
          const h = this.opacity;
          this.addCommands({
            cmd: i.bind(this, t),
            undo: i.bind(this, h),
            post: this._uiManager.updateUI.bind(this._uiManager, this),
            mustExec: !0,
            type: y.AnnotationEditorParamsType.INK_OPACITY,
            overwriteIfSameType: !0,
            keepUndo: !0
          });
        }
        rebuild() {
          this.parent && (super.rebuild(), this.div !== null && (this.canvas || (this.#T(), this.#M()), this.isAttachedToDOM || (this.parent.add(this), this.#F()), this.#O()));
        }
        remove() {
          this.canvas !== null && (this.isEmpty() || this.commit(), this.canvas.width = this.canvas.height = 0, this.canvas.remove(), this.canvas = null, this.#a && (clearTimeout(this.#a), this.#a = null), this.#c.disconnect(), this.#c = null, super.remove());
        }
        setParent(t) {
          !this.parent && t ? this._uiManager.removeShouldRescale(this) : this.parent && t === null && this._uiManager.addShouldRescale(this), super.setParent(t);
        }
        onScaleChanging() {
          const [t, i] = this.parentDimensions, h = this.width * t, f = this.height * i;
          this.setDimensions(h, f);
        }
        enableEditMode() {
          this.#h || this.canvas === null || (super.enableEditMode(), this._isDraggable = !1, this.canvas.addEventListener("pointerdown", this.#i));
        }
        disableEditMode() {
          !this.isInEditMode() || this.canvas === null || (super.disableEditMode(), this._isDraggable = !this.isEmpty(), this.div.classList.remove("editing"), this.canvas.removeEventListener("pointerdown", this.#i));
        }
        onceAdded() {
          this._isDraggable = !this.isEmpty();
        }
        isEmpty() {
          return this.paths.length === 0 || this.paths.length === 1 && this.paths[0].length === 0;
        }
        #v() {
          const {
            parentRotation: t,
            parentDimensions: [i, h]
          } = this;
          switch (t) {
            case 90:
              return [0, h, h, i];
            case 180:
              return [i, h, i, h];
            case 270:
              return [i, 0, h, i];
            default:
              return [0, 0, i, h];
          }
        }
        #w() {
          const {
            ctx: t,
            color: i,
            opacity: h,
            thickness: f,
            parentScale: w,
            scaleFactor: S
          } = this;
          t.lineWidth = f * w / S, t.lineCap = "round", t.lineJoin = "round", t.miterLimit = 10, t.strokeStyle = `${i}${(0, N.opacityToHex)(h)}`;
        }
        #C(t, i) {
          this.canvas.addEventListener("contextmenu", r.noContextMenu), this.canvas.addEventListener("pointerleave", this.#n), this.canvas.addEventListener("pointermove", this.#s), this.canvas.addEventListener("pointerup", this.#r), this.canvas.removeEventListener("pointerdown", this.#i), this.isEditing = !0, this.#u || (this.#u = !0, this.#F(), this.thickness ||= c._defaultThickness, this.color ||= c._defaultColor || B.AnnotationEditor._defaultLineColor, this.opacity ??= c._defaultOpacity), this.currentPath.push([t, i]), this.#d = !1, this.#w(), this.#g = () => {
            this.#y(), this.#g && window.requestAnimationFrame(this.#g);
          }, window.requestAnimationFrame(this.#g);
        }
        #R(t, i) {
          const [h, f] = this.currentPath.at(-1);
          if (this.currentPath.length > 1 && t === h && i === f)
            return;
          const w = this.currentPath;
          let S = this.#l;
          if (w.push([t, i]), this.#d = !0, w.length <= 2) {
            S.moveTo(...w[0]), S.lineTo(t, i);
            return;
          }
          w.length === 3 && (this.#l = S = new Path2D(), S.moveTo(...w[0])), this.#b(S, ...w.at(-3), ...w.at(-2), t, i);
        }
        #I() {
          if (this.currentPath.length === 0)
            return;
          const t = this.currentPath.at(-1);
          this.#l.lineTo(...t);
        }
        #P(t, i) {
          this.#g = null, t = Math.min(Math.max(t, 0), this.canvas.width), i = Math.min(Math.max(i, 0), this.canvas.height), this.#R(t, i), this.#I();
          let h;
          if (this.currentPath.length !== 1)
            h = this.#S();
          else {
            const M = [t, i];
            h = [[M, M.slice(), M.slice(), M]];
          }
          const f = this.#l, w = this.currentPath;
          this.currentPath = [], this.#l = new Path2D();
          const S = () => {
            this.allRawPaths.push(w), this.paths.push(h), this.bezierPath2D.push(f), this._uiManager.rebuild(this);
          }, P = () => {
            this.allRawPaths.pop(), this.paths.pop(), this.bezierPath2D.pop(), this.paths.length === 0 ? this.remove() : (this.canvas || (this.#T(), this.#M()), this.#O());
          };
          this.addCommands({
            cmd: S,
            undo: P,
            mustExec: !0
          });
        }
        #y() {
          if (!this.#d)
            return;
          this.#d = !1;
          const t = Math.ceil(this.thickness * this.parentScale), i = this.currentPath.slice(-3), h = i.map((S) => S[0]), f = i.map((S) => S[1]);
          Math.min(...h) - t, Math.max(...h) + t, Math.min(...f) - t, Math.max(...f) + t;
          const {
            ctx: w
          } = this;
          w.save(), w.clearRect(0, 0, this.canvas.width, this.canvas.height);
          for (const S of this.bezierPath2D)
            w.stroke(S);
          w.stroke(this.#l), w.restore();
        }
        #b(t, i, h, f, w, S, P) {
          const M = (i + f) / 2, O = (h + w) / 2, _ = (f + S) / 2, z = (w + P) / 2;
          t.bezierCurveTo(M + 2 * (f - M) / 3, O + 2 * (w - O) / 3, _ + 2 * (f - _) / 3, z + 2 * (w - z) / 3, _, z);
        }
        #S() {
          const t = this.currentPath;
          if (t.length <= 2)
            return [[t[0], t[0], t.at(-1), t.at(-1)]];
          const i = [];
          let h, [f, w] = t[0];
          for (h = 1; h < t.length - 2; h++) {
            const [K, nt] = t[h], [j, H] = t[h + 1], G = (K + j) / 2, Y = (nt + H) / 2, et = [f + 2 * (K - f) / 3, w + 2 * (nt - w) / 3], tt = [G + 2 * (K - G) / 3, Y + 2 * (nt - Y) / 3];
            i.push([[f, w], et, tt, [G, Y]]), [f, w] = [G, Y];
          }
          const [S, P] = t[h], [M, O] = t[h + 1], _ = [f + 2 * (S - f) / 3, w + 2 * (P - w) / 3], z = [M + 2 * (S - M) / 3, O + 2 * (P - O) / 3];
          return i.push([[f, w], _, z, [M, O]]), i;
        }
        #E() {
          if (this.isEmpty()) {
            this.#L();
            return;
          }
          this.#w();
          const {
            canvas: t,
            ctx: i
          } = this;
          i.setTransform(1, 0, 0, 1, 0, 0), i.clearRect(0, 0, t.width, t.height), this.#L();
          for (const h of this.bezierPath2D)
            i.stroke(h);
        }
        commit() {
          this.#h || (super.commit(), this.isEditing = !1, this.disableEditMode(), this.setInForeground(), this.#h = !0, this.div.classList.add("disabled"), this.#O(!0), this.select(), this.parent.addInkEditorIfNeeded(!0), this.moveInDOM(), this.div.focus({
            preventScroll: !0
          }));
        }
        focusin(t) {
          this._focusEventsAllowed && (super.focusin(t), this.enableEditMode());
        }
        canvasPointerdown(t) {
          t.button !== 0 || !this.isInEditMode() || this.#h || (this.setInForeground(), t.preventDefault(), this.div.contains(document.activeElement) || this.div.focus({
            preventScroll: !0
          }), this.#C(t.offsetX, t.offsetY));
        }
        canvasPointermove(t) {
          t.preventDefault(), this.#R(t.offsetX, t.offsetY);
        }
        canvasPointerup(t) {
          t.preventDefault(), this.#k(t);
        }
        canvasPointerleave(t) {
          this.#k(t);
        }
        #k(t) {
          this.canvas.removeEventListener("pointerleave", this.#n), this.canvas.removeEventListener("pointermove", this.#s), this.canvas.removeEventListener("pointerup", this.#r), this.canvas.addEventListener("pointerdown", this.#i), this.#a && clearTimeout(this.#a), this.#a = setTimeout(() => {
            this.#a = null, this.canvas.removeEventListener("contextmenu", r.noContextMenu);
          }, 10), this.#P(t.offsetX, t.offsetY), this.addToAnnotationStorage(), this.setInBackground();
        }
        #T() {
          this.canvas = document.createElement("canvas"), this.canvas.width = this.canvas.height = 0, this.canvas.className = "inkEditorCanvas", this.canvas.setAttribute("data-l10n-id", "pdfjs-ink-canvas"), this.div.append(this.canvas), this.ctx = this.canvas.getContext("2d");
        }
        #M() {
          this.#c = new ResizeObserver((t) => {
            const i = t[0].contentRect;
            i.width && i.height && this.setDimensions(i.width, i.height);
          }), this.#c.observe(this.div);
        }
        get isResizable() {
          return !this.isEmpty() && this.#h;
        }
        render() {
          if (this.div)
            return this.div;
          let t, i;
          this.width && (t = this.x, i = this.y), super.render(), this.div.setAttribute("data-l10n-id", "pdfjs-ink");
          const [h, f, w, S] = this.#v();
          if (this.setAt(h, f, 0, 0), this.setDims(w, S), this.#T(), this.width) {
            const [P, M] = this.parentDimensions;
            this.setAspectRatio(this.width * P, this.height * M), this.setAt(t * P, i * M, this.width * P, this.height * M), this.#u = !0, this.#F(), this.setDims(this.width * P, this.height * M), this.#E(), this.div.classList.add("disabled");
          } else
            this.div.classList.add("editing"), this.enableEditMode();
          return this.#M(), this.div;
        }
        #F() {
          if (!this.#u)
            return;
          const [t, i] = this.parentDimensions;
          this.canvas.width = Math.ceil(this.width * t), this.canvas.height = Math.ceil(this.height * i), this.#L();
        }
        setDimensions(t, i) {
          const h = Math.round(t), f = Math.round(i);
          if (this.#o === h && this.#p === f)
            return;
          this.#o = h, this.#p = f, this.canvas.style.visibility = "hidden";
          const [w, S] = this.parentDimensions;
          this.width = t / w, this.height = i / S, this.fixAndSetPosition(), this.#h && this.#N(t, i), this.#F(), this.#E(), this.canvas.style.visibility = "visible", this.fixDims();
        }
        #N(t, i) {
          const h = this.#B(), f = (t - h) / this.#e, w = (i - h) / this.#t;
          this.scaleFactor = Math.min(f, w);
        }
        #L() {
          const t = this.#B() / 2;
          this.ctx.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, this.translationX * this.scaleFactor + t, this.translationY * this.scaleFactor + t);
        }
        static #D(t) {
          const i = new Path2D();
          for (let h = 0, f = t.length; h < f; h++) {
            const [w, S, P, M] = t[h];
            h === 0 && i.moveTo(...w), i.bezierCurveTo(S[0], S[1], P[0], P[1], M[0], M[1]);
          }
          return i;
        }
        static #G(t, i, h) {
          const [f, w, S, P] = i;
          switch (h) {
            case 0:
              for (let M = 0, O = t.length; M < O; M += 2)
                t[M] += f, t[M + 1] = P - t[M + 1];
              break;
            case 90:
              for (let M = 0, O = t.length; M < O; M += 2) {
                const _ = t[M];
                t[M] = t[M + 1] + f, t[M + 1] = _ + w;
              }
              break;
            case 180:
              for (let M = 0, O = t.length; M < O; M += 2)
                t[M] = S - t[M], t[M + 1] += w;
              break;
            case 270:
              for (let M = 0, O = t.length; M < O; M += 2) {
                const _ = t[M];
                t[M] = S - t[M + 1], t[M + 1] = P - _;
              }
              break;
            default:
              throw new Error("Invalid rotation");
          }
          return t;
        }
        static #X(t, i, h) {
          const [f, w, S, P] = i;
          switch (h) {
            case 0:
              for (let M = 0, O = t.length; M < O; M += 2)
                t[M] -= f, t[M + 1] = P - t[M + 1];
              break;
            case 90:
              for (let M = 0, O = t.length; M < O; M += 2) {
                const _ = t[M];
                t[M] = t[M + 1] - w, t[M + 1] = _ - f;
              }
              break;
            case 180:
              for (let M = 0, O = t.length; M < O; M += 2)
                t[M] = S - t[M], t[M + 1] -= w;
              break;
            case 270:
              for (let M = 0, O = t.length; M < O; M += 2) {
                const _ = t[M];
                t[M] = P - t[M + 1], t[M + 1] = S - _;
              }
              break;
            default:
              throw new Error("Invalid rotation");
          }
          return t;
        }
        #$(t, i, h, f) {
          const w = [], S = this.thickness / 2, P = t * i + S, M = t * h + S;
          for (const O of this.paths) {
            const _ = [], z = [];
            for (let K = 0, nt = O.length; K < nt; K++) {
              const [j, H, G, Y] = O[K];
              if (j[0] === Y[0] && j[1] === Y[1] && nt === 1) {
                const st = t * j[0] + P, b = t * j[1] + M;
                _.push(st, b), z.push(st, b);
                break;
              }
              const et = t * j[0] + P, tt = t * j[1] + M, ot = t * H[0] + P, ct = t * H[1] + M, pt = t * G[0] + P, dt = t * G[1] + M, ht = t * Y[0] + P, ut = t * Y[1] + M;
              K === 0 && (_.push(et, tt), z.push(et, tt)), _.push(ot, ct, pt, dt, ht, ut), z.push(ot, ct), K === nt - 1 && z.push(ht, ut);
            }
            w.push({
              bezier: c.#G(_, f, this.rotation),
              points: c.#G(z, f, this.rotation)
            });
          }
          return w;
        }
        #V() {
          let t = 1 / 0, i = -1 / 0, h = 1 / 0, f = -1 / 0;
          for (const w of this.paths)
            for (const [S, P, M, O] of w) {
              const _ = y.Util.bezierBoundingBox(...S, ...P, ...M, ...O);
              t = Math.min(t, _[0]), h = Math.min(h, _[1]), i = Math.max(i, _[2]), f = Math.max(f, _[3]);
            }
          return [t, h, i, f];
        }
        #B() {
          return this.#h ? Math.ceil(this.thickness * this.parentScale) : 0;
        }
        #O(t = !1) {
          if (this.isEmpty())
            return;
          if (!this.#h) {
            this.#E();
            return;
          }
          const i = this.#V(), h = this.#B();
          this.#e = Math.max(B.AnnotationEditor.MIN_SIZE, i[2] - i[0]), this.#t = Math.max(B.AnnotationEditor.MIN_SIZE, i[3] - i[1]);
          const f = Math.ceil(h + this.#e * this.scaleFactor), w = Math.ceil(h + this.#t * this.scaleFactor), [S, P] = this.parentDimensions;
          this.width = f / S, this.height = w / P, this.setAspectRatio(f, w);
          const M = this.translationX, O = this.translationY;
          this.translationX = -i[0], this.translationY = -i[1], this.#F(), this.#E(), this.#o = f, this.#p = w, this.setDims(f, w);
          const _ = t ? h / this.scaleFactor / 2 : 0;
          this.translate(M - this.translationX - _, O - this.translationY - _);
        }
        static deserialize(t, i, h) {
          if (t instanceof U.InkAnnotationElement)
            return null;
          const f = super.deserialize(t, i, h);
          f.thickness = t.thickness, f.color = y.Util.makeHexColor(...t.color), f.opacity = t.opacity;
          const [w, S] = f.pageDimensions, P = f.width * w, M = f.height * S, O = f.parentScale, _ = t.thickness / 2;
          f.#h = !0, f.#o = Math.round(P), f.#p = Math.round(M);
          const {
            paths: z,
            rect: K,
            rotation: nt
          } = t;
          for (let {
            bezier: H
          } of z) {
            H = c.#X(H, K, nt);
            const G = [];
            f.paths.push(G);
            let Y = O * (H[0] - _), et = O * (H[1] - _);
            for (let ot = 2, ct = H.length; ot < ct; ot += 6) {
              const pt = O * (H[ot] - _), dt = O * (H[ot + 1] - _), ht = O * (H[ot + 2] - _), ut = O * (H[ot + 3] - _), st = O * (H[ot + 4] - _), b = O * (H[ot + 5] - _);
              G.push([[Y, et], [pt, dt], [ht, ut], [st, b]]), Y = st, et = b;
            }
            const tt = this.#D(G);
            f.bezierPath2D.push(tt);
          }
          const j = f.#V();
          return f.#e = Math.max(B.AnnotationEditor.MIN_SIZE, j[2] - j[0]), f.#t = Math.max(B.AnnotationEditor.MIN_SIZE, j[3] - j[1]), f.#N(P, M), f;
        }
        serialize() {
          if (this.isEmpty())
            return null;
          const t = this.getRect(0, 0), i = B.AnnotationEditor._colorManager.convert(this.ctx.strokeStyle);
          return {
            annotationType: y.AnnotationEditorType.INK,
            color: i,
            thickness: this.thickness,
            opacity: this.opacity,
            paths: this.#$(this.scaleFactor / this.parentScale, this.translationX, this.translationY, t),
            pageIndex: this.pageIndex,
            rect: t,
            rotation: this.rotation,
            structTreeParentId: this._structTreeParentId
          };
        }
      }
      class m extends B.AnnotationEditor {
        #t = null;
        #e = null;
        #s = null;
        #n = null;
        #r = null;
        #i = "";
        #a = null;
        #l = null;
        #h = null;
        #d = !1;
        #u = !1;
        static _type = "stamp";
        static _editorType = y.AnnotationEditorType.STAMP;
        constructor(t) {
          super({
            ...t,
            name: "stampEditor"
          }), this.#n = t.bitmapUrl, this.#r = t.bitmapFile;
        }
        static initialize(t, i) {
          B.AnnotationEditor.initialize(t, i);
        }
        static get supportedTypes() {
          const t = ["apng", "avif", "bmp", "gif", "jpeg", "png", "svg+xml", "webp", "x-icon"];
          return (0, y.shadow)(this, "supportedTypes", t.map((i) => `image/${i}`));
        }
        static get supportedTypesStr() {
          return (0, y.shadow)(this, "supportedTypesStr", this.supportedTypes.join(","));
        }
        static isHandlingMimeForPasting(t) {
          return this.supportedTypes.includes(t);
        }
        static paste(t, i) {
          i.pasteEditor(y.AnnotationEditorType.STAMP, {
            bitmapFile: t.getAsFile()
          });
        }
        #c(t, i = !1) {
          if (!t) {
            this.remove();
            return;
          }
          this.#t = t.bitmap, i || (this.#e = t.id, this.#d = t.isSvg), t.file && (this.#i = t.file.name), this.#g();
        }
        #o() {
          this.#s = null, this._uiManager.enableWaiting(!1), this.#a && this.div.focus();
        }
        #p() {
          if (this.#e) {
            this._uiManager.enableWaiting(!0), this._uiManager.imageManager.getFromId(this.#e).then((i) => this.#c(i, !0)).finally(() => this.#o());
            return;
          }
          if (this.#n) {
            const i = this.#n;
            this.#n = null, this._uiManager.enableWaiting(!0), this.#s = this._uiManager.imageManager.getFromUrl(i).then((h) => this.#c(h)).finally(() => this.#o());
            return;
          }
          if (this.#r) {
            const i = this.#r;
            this.#r = null, this._uiManager.enableWaiting(!0), this.#s = this._uiManager.imageManager.getFromFile(i).then((h) => this.#c(h)).finally(() => this.#o());
            return;
          }
          const t = document.createElement("input");
          t.type = "file", t.accept = m.supportedTypesStr, this.#s = new Promise((i) => {
            t.addEventListener("change", async () => {
              if (!t.files || t.files.length === 0)
                this.remove();
              else {
                this._uiManager.enableWaiting(!0);
                const h = await this._uiManager.imageManager.getFromFile(t.files[0]);
                this.#c(h);
              }
              i();
            }), t.addEventListener("cancel", () => {
              this.remove(), i();
            });
          }).finally(() => this.#o()), t.click();
        }
        remove() {
          this.#e && (this.#t = null, this._uiManager.imageManager.deleteId(this.#e), this.#a?.remove(), this.#a = null, this.#l?.disconnect(), this.#l = null, this.#h && (clearTimeout(this.#h), this.#h = null)), super.remove();
        }
        rebuild() {
          if (!this.parent) {
            this.#e && this.#p();
            return;
          }
          super.rebuild(), this.div !== null && (this.#e && this.#a === null && this.#p(), this.isAttachedToDOM || this.parent.add(this));
        }
        onceAdded() {
          this._isDraggable = !0, this.div.focus();
        }
        isEmpty() {
          return !(this.#s || this.#t || this.#n || this.#r || this.#e);
        }
        get isResizable() {
          return !0;
        }
        render() {
          if (this.div)
            return this.div;
          let t, i;
          if (this.width && (t = this.x, i = this.y), super.render(), this.div.hidden = !0, this.addAltTextButton(), this.#t ? this.#g() : this.#p(), this.width) {
            const [h, f] = this.parentDimensions;
            this.setAt(t * h, i * f, this.width * h, this.height * f);
          }
          return this.div;
        }
        #g() {
          const {
            div: t
          } = this;
          let {
            width: i,
            height: h
          } = this.#t;
          const [f, w] = this.pageDimensions, S = 0.75;
          if (this.width)
            i = this.width * f, h = this.height * w;
          else if (i > S * f || h > S * w) {
            const _ = Math.min(S * f / i, S * w / h);
            i *= _, h *= _;
          }
          const [P, M] = this.parentDimensions;
          this.setDims(i * P / f, h * M / w), this._uiManager.enableWaiting(!1);
          const O = this.#a = document.createElement("canvas");
          t.append(O), t.hidden = !1, this.#m(i, h), this.#w(), this.#u || (this.parent.addUndoableEditor(this), this.#u = !0), this._reportTelemetry({
            action: "inserted_image"
          }), this.#i && O.setAttribute("aria-label", this.#i);
        }
        #f(t, i) {
          const [h, f] = this.parentDimensions;
          this.width = t / h, this.height = i / f, this.setDims(t, i), this._initialOptions?.isCentered ? this.center() : this.fixAndSetPosition(), this._initialOptions = null, this.#h !== null && clearTimeout(this.#h);
          const w = 200;
          this.#h = setTimeout(() => {
            this.#h = null, this.#m(t, i);
          }, w);
        }
        #A(t, i) {
          const {
            width: h,
            height: f
          } = this.#t;
          let w = h, S = f, P = this.#t;
          for (; w > 2 * t || S > 2 * i; ) {
            const M = w, O = S;
            w > 2 * t && (w = w >= 16384 ? Math.floor(w / 2) - 1 : Math.ceil(w / 2)), S > 2 * i && (S = S >= 16384 ? Math.floor(S / 2) - 1 : Math.ceil(S / 2));
            const _ = new OffscreenCanvas(w, S);
            _.getContext("2d").drawImage(P, 0, 0, M, O, 0, 0, w, S), P = _.transferToImageBitmap();
          }
          return P;
        }
        #m(t, i) {
          t = Math.ceil(t), i = Math.ceil(i);
          const h = this.#a;
          if (!h || h.width === t && h.height === i)
            return;
          h.width = t, h.height = i;
          const f = this.#d ? this.#t : this.#A(t, i);
          if (this._uiManager.hasMLManager && !this.hasAltText()) {
            const S = new OffscreenCanvas(t, i);
            S.getContext("2d").drawImage(f, 0, 0, f.width, f.height, 0, 0, t, i), S.convertToBlob().then((M) => {
              const O = new FileReader();
              O.onload = () => {
                const _ = O.result;
                this._uiManager.mlGuess({
                  service: "image-to-text",
                  request: {
                    imageData: _
                  }
                }).then((z) => {
                  const K = z?.output || "";
                  this.parent && K && !this.hasAltText() && (this.altTextData = {
                    altText: K,
                    decorative: !1
                  });
                });
              }, O.readAsDataURL(M);
            });
          }
          const w = h.getContext("2d");
          w.filter = this._uiManager.hcmFilter, w.drawImage(f, 0, 0, f.width, f.height, 0, 0, t, i);
        }
        getImageForAltText() {
          return this.#a;
        }
        #v(t) {
          if (t) {
            if (this.#d) {
              const f = this._uiManager.imageManager.getSvgUrl(this.#e);
              if (f)
                return f;
            }
            const i = document.createElement("canvas");
            return {
              width: i.width,
              height: i.height
            } = this.#t, i.getContext("2d").drawImage(this.#t, 0, 0), i.toDataURL();
          }
          if (this.#d) {
            const [i, h] = this.pageDimensions, f = Math.round(this.width * i * r.PixelsPerInch.PDF_TO_CSS_UNITS), w = Math.round(this.height * h * r.PixelsPerInch.PDF_TO_CSS_UNITS), S = new OffscreenCanvas(f, w);
            return S.getContext("2d").drawImage(this.#t, 0, 0, this.#t.width, this.#t.height, 0, 0, f, w), S.transferToImageBitmap();
          }
          return structuredClone(this.#t);
        }
        #w() {
          this.#l = new ResizeObserver((t) => {
            const i = t[0].contentRect;
            i.width && i.height && this.#f(i.width, i.height);
          }), this.#l.observe(this.div);
        }
        static deserialize(t, i, h) {
          if (t instanceof U.StampAnnotationElement)
            return null;
          const f = super.deserialize(t, i, h), {
            rect: w,
            bitmapUrl: S,
            bitmapId: P,
            isSvg: M,
            accessibilityData: O
          } = t;
          P && h.imageManager.isValidId(P) ? f.#e = P : f.#n = S, f.#d = M;
          const [_, z] = f.pageDimensions;
          return f.width = (w[2] - w[0]) / _, f.height = (w[3] - w[1]) / z, O && (f.altTextData = O), f;
        }
        serialize(t = !1, i = null) {
          if (this.isEmpty())
            return null;
          const h = {
            annotationType: y.AnnotationEditorType.STAMP,
            bitmapId: this.#e,
            pageIndex: this.pageIndex,
            rect: this.getRect(0, 0),
            rotation: this.rotation,
            isSvg: this.#d,
            structTreeParentId: this._structTreeParentId
          };
          if (t)
            return h.bitmapUrl = this.#v(!0), h.accessibilityData = this.altTextData, h;
          const {
            decorative: f,
            altText: w
          } = this.altTextData;
          if (!f && w && (h.accessibilityData = {
            type: "Figure",
            alt: w
          }), i === null)
            return h;
          i.stamps ||= /* @__PURE__ */ new Map();
          const S = this.#d ? (h.rect[2] - h.rect[0]) * (h.rect[3] - h.rect[1]) : null;
          if (!i.stamps.has(this.#e))
            i.stamps.set(this.#e, {
              area: S,
              serialized: h
            }), h.bitmap = this.#v(!1);
          else if (this.#d) {
            const P = i.stamps.get(this.#e);
            S > P.area && (P.area = S, P.serialized.bitmap.close(), P.serialized.bitmap = this.#v(!1));
          }
          return h;
        }
      }
      class s {
        #t;
        #e = !1;
        #s = null;
        #n = null;
        #r = null;
        #i = null;
        #a = null;
        #l = /* @__PURE__ */ new Map();
        #h = !1;
        #d = !1;
        #u = !1;
        #c = null;
        #o;
        static _initialized = !1;
        static #p = new Map([C, c, m, d].map((t) => [t._editorType, t]));
        constructor({
          uiManager: t,
          pageIndex: i,
          div: h,
          accessibilityManager: f,
          annotationLayer: w,
          drawLayer: S,
          textLayer: P,
          viewport: M,
          l10n: O
        }) {
          const _ = [...s.#p.values()];
          if (!s._initialized) {
            s._initialized = !0;
            for (const z of _)
              z.initialize(O, t);
          }
          t.registerEditorTypes(_), this.#o = t, this.pageIndex = i, this.div = h, this.#t = f, this.#s = w, this.viewport = M, this.#c = P, this.drawLayer = S, this.#o.addLayer(this);
        }
        get isEmpty() {
          return this.#l.size === 0;
        }
        get isInvisible() {
          return this.isEmpty && this.#o.getMode() === y.AnnotationEditorType.NONE;
        }
        updateToolbar(t) {
          this.#o.updateToolbar(t);
        }
        updateMode(t = this.#o.getMode()) {
          switch (this.#v(), t) {
            case y.AnnotationEditorType.NONE:
              this.disableTextSelection(), this.togglePointerEvents(!1), this.toggleAnnotationLayerPointerEvents(!0), this.disableClick();
              return;
            case y.AnnotationEditorType.INK:
              this.addInkEditorIfNeeded(!1), this.disableTextSelection(), this.togglePointerEvents(!0), this.disableClick();
              break;
            case y.AnnotationEditorType.HIGHLIGHT:
              this.enableTextSelection(), this.togglePointerEvents(!1), this.disableClick();
              break;
            default:
              this.disableTextSelection(), this.togglePointerEvents(!0), this.enableClick();
          }
          this.toggleAnnotationLayerPointerEvents(!1);
          const {
            classList: i
          } = this.div;
          for (const h of s.#p.values())
            i.toggle(`${h._type}Editing`, t === h._editorType);
          this.div.hidden = !1;
        }
        hasTextLayer(t) {
          return t === this.#c?.div;
        }
        addInkEditorIfNeeded(t) {
          if (this.#o.getMode() !== y.AnnotationEditorType.INK)
            return;
          if (!t) {
            for (const h of this.#l.values())
              if (h.isEmpty()) {
                h.setInBackground();
                return;
              }
          }
          this.createAndAddNewEditor({
            offsetX: 0,
            offsetY: 0
          }, !1).setInBackground();
        }
        setEditingState(t) {
          this.#o.setEditingState(t);
        }
        addCommands(t) {
          this.#o.addCommands(t);
        }
        togglePointerEvents(t = !1) {
          this.div.classList.toggle("disabled", !t);
        }
        toggleAnnotationLayerPointerEvents(t = !1) {
          this.#s?.div.classList.toggle("disabled", !t);
        }
        enable() {
          this.div.tabIndex = 0, this.togglePointerEvents(!0);
          const t = /* @__PURE__ */ new Set();
          for (const h of this.#l.values())
            h.enableEditing(), h.show(!0), h.annotationElementId && (this.#o.removeChangedExistingAnnotation(h), t.add(h.annotationElementId));
          if (!this.#s)
            return;
          const i = this.#s.getEditableAnnotations();
          for (const h of i) {
            if (h.hide(), this.#o.isDeletedAnnotationElement(h.data.id) || t.has(h.data.id))
              continue;
            const f = this.deserialize(h);
            f && (this.addOrRebuild(f), f.enableEditing());
          }
        }
        disable() {
          this.#u = !0, this.div.tabIndex = -1, this.togglePointerEvents(!1);
          const t = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
          for (const f of this.#l.values())
            if (f.disableEditing(), !!f.annotationElementId) {
              if (f.serialize() !== null) {
                t.set(f.annotationElementId, f);
                continue;
              } else
                i.set(f.annotationElementId, f);
              this.getEditableAnnotation(f.annotationElementId)?.show(), f.remove();
            }
          if (this.#s) {
            const f = this.#s.getEditableAnnotations();
            for (const w of f) {
              const {
                id: S
              } = w.data;
              if (this.#o.isDeletedAnnotationElement(S))
                continue;
              let P = i.get(S);
              if (P) {
                P.resetAnnotationElement(w), P.show(!1), w.show();
                continue;
              }
              P = t.get(S), P && (this.#o.addChangedExistingAnnotation(P), P.renderAnnotationElement(w), P.show(!1)), w.show();
            }
          }
          this.#v(), this.isEmpty && (this.div.hidden = !0);
          const {
            classList: h
          } = this.div;
          for (const f of s.#p.values())
            h.remove(`${f._type}Editing`);
          this.disableTextSelection(), this.toggleAnnotationLayerPointerEvents(!0), this.#u = !1;
        }
        getEditableAnnotation(t) {
          return this.#s?.getEditableAnnotation(t) || null;
        }
        setActiveEditor(t) {
          this.#o.getActive() !== t && this.#o.setActiveEditor(t);
        }
        enableTextSelection() {
          this.div.tabIndex = -1, this.#c?.div && !this.#i && (this.#i = this.#g.bind(this), this.#c.div.addEventListener("pointerdown", this.#i), this.#c.div.classList.add("highlighting"));
        }
        disableTextSelection() {
          this.div.tabIndex = 0, this.#c?.div && this.#i && (this.#c.div.removeEventListener("pointerdown", this.#i), this.#i = null, this.#c.div.classList.remove("highlighting"));
        }
        #g(t) {
          if (this.#o.unselectAll(), t.target === this.#c.div) {
            const {
              isMac: i
            } = y.FeatureTest.platform;
            if (t.button !== 0 || t.ctrlKey && i)
              return;
            this.#o.showAllEditors("highlight", !0, !0), this.#c.div.classList.add("free"), d.startHighlighting(this, this.#o.direction === "ltr", t), this.#c.div.addEventListener("pointerup", () => {
              this.#c.div.classList.remove("free");
            }, {
              once: !0
            }), t.preventDefault();
          }
        }
        enableClick() {
          this.#r || (this.#r = this.pointerdown.bind(this), this.#n = this.pointerup.bind(this), this.div.addEventListener("pointerdown", this.#r), this.div.addEventListener("pointerup", this.#n));
        }
        disableClick() {
          this.#r && (this.div.removeEventListener("pointerdown", this.#r), this.div.removeEventListener("pointerup", this.#n), this.#r = null, this.#n = null);
        }
        attach(t) {
          this.#l.set(t.id, t);
          const {
            annotationElementId: i
          } = t;
          i && this.#o.isDeletedAnnotationElement(i) && this.#o.removeDeletedAnnotationElement(t);
        }
        detach(t) {
          this.#l.delete(t.id), this.#t?.removePointerInTextLayer(t.contentDiv), !this.#u && t.annotationElementId && this.#o.addDeletedAnnotationElement(t);
        }
        remove(t) {
          this.detach(t), this.#o.removeEditor(t), t.div.remove(), t.isAttachedToDOM = !1, this.#d || this.addInkEditorIfNeeded(!1);
        }
        changeParent(t) {
          t.parent !== this && (t.parent && t.annotationElementId && (this.#o.addDeletedAnnotationElement(t.annotationElementId), B.AnnotationEditor.deleteAnnotationElement(t), t.annotationElementId = null), this.attach(t), t.parent?.detach(t), t.setParent(this), t.div && t.isAttachedToDOM && (t.div.remove(), this.div.append(t.div)));
        }
        add(t) {
          if (!(t.parent === this && t.isAttachedToDOM)) {
            if (this.changeParent(t), this.#o.addEditor(t), this.attach(t), !t.isAttachedToDOM) {
              const i = t.render();
              this.div.append(i), t.isAttachedToDOM = !0;
            }
            t.fixAndSetPosition(), t.onceAdded(), this.#o.addToAnnotationStorage(t), t._reportTelemetry(t.telemetryInitialData);
          }
        }
        moveEditorInDOM(t) {
          if (!t.isAttachedToDOM)
            return;
          const {
            activeElement: i
          } = document;
          t.div.contains(i) && !this.#a && (t._focusEventsAllowed = !1, this.#a = setTimeout(() => {
            this.#a = null, t.div.contains(document.activeElement) ? t._focusEventsAllowed = !0 : (t.div.addEventListener("focusin", () => {
              t._focusEventsAllowed = !0;
            }, {
              once: !0
            }), i.focus());
          }, 0)), t._structTreeParentId = this.#t?.moveElementInDOM(this.div, t.div, t.contentDiv, !0);
        }
        addOrRebuild(t) {
          t.needsToBeRebuilt() ? (t.parent ||= this, t.rebuild(), t.show()) : this.add(t);
        }
        addUndoableEditor(t) {
          const i = () => t._uiManager.rebuild(t), h = () => {
            t.remove();
          };
          this.addCommands({
            cmd: i,
            undo: h,
            mustExec: !1
          });
        }
        getNextId() {
          return this.#o.getId();
        }
        get #f() {
          return s.#p.get(this.#o.getMode());
        }
        #A(t) {
          const i = this.#f;
          return i ? new i.prototype.constructor(t) : null;
        }
        canCreateNewEmptyEditor() {
          return this.#f?.canCreateNewEmptyEditor();
        }
        pasteEditor(t, i) {
          this.#o.updateToolbar(t), this.#o.updateMode(t);
          const {
            offsetX: h,
            offsetY: f
          } = this.#m(), w = this.getNextId(), S = this.#A({
            parent: this,
            id: w,
            x: h,
            y: f,
            uiManager: this.#o,
            isCentered: !0,
            ...i
          });
          S && this.add(S);
        }
        deserialize(t) {
          return s.#p.get(t.annotationType ?? t.annotationEditorType)?.deserialize(t, this, this.#o) || null;
        }
        createAndAddNewEditor(t, i, h = {}) {
          const f = this.getNextId(), w = this.#A({
            parent: this,
            id: f,
            x: t.offsetX,
            y: t.offsetY,
            uiManager: this.#o,
            isCentered: i,
            ...h
          });
          return w && this.add(w), w;
        }
        #m() {
          const {
            x: t,
            y: i,
            width: h,
            height: f
          } = this.div.getBoundingClientRect(), w = Math.max(0, t), S = Math.max(0, i), P = Math.min(window.innerWidth, t + h), M = Math.min(window.innerHeight, i + f), O = (w + P) / 2 - t, _ = (S + M) / 2 - i, [z, K] = this.viewport.rotation % 180 === 0 ? [O, _] : [_, O];
          return {
            offsetX: z,
            offsetY: K
          };
        }
        addNewEditor() {
          this.createAndAddNewEditor(this.#m(), !0);
        }
        setSelected(t) {
          this.#o.setSelected(t);
        }
        toggleSelected(t) {
          this.#o.toggleSelected(t);
        }
        isSelected(t) {
          return this.#o.isSelected(t);
        }
        unselect(t) {
          this.#o.unselect(t);
        }
        pointerup(t) {
          const {
            isMac: i
          } = y.FeatureTest.platform;
          if (!(t.button !== 0 || t.ctrlKey && i) && t.target === this.div && this.#h) {
            if (this.#h = !1, !this.#e) {
              this.#e = !0;
              return;
            }
            if (this.#o.getMode() === y.AnnotationEditorType.STAMP) {
              this.#o.unselectAll();
              return;
            }
            this.createAndAddNewEditor(t, !1);
          }
        }
        pointerdown(t) {
          if (this.#o.getMode() === y.AnnotationEditorType.HIGHLIGHT && this.enableTextSelection(), this.#h) {
            this.#h = !1;
            return;
          }
          const {
            isMac: i
          } = y.FeatureTest.platform;
          if (t.button !== 0 || t.ctrlKey && i || t.target !== this.div)
            return;
          this.#h = !0;
          const h = this.#o.getActive();
          this.#e = !h || h.isEmpty();
        }
        findNewParent(t, i, h) {
          const f = this.#o.findParent(i, h);
          return f === null || f === this ? !1 : (f.changeParent(t), !0);
        }
        destroy() {
          this.#o.getActive()?.parent === this && (this.#o.commitOrRemove(), this.#o.setActiveEditor(null)), this.#a && (clearTimeout(this.#a), this.#a = null);
          for (const t of this.#l.values())
            this.#t?.removePointerInTextLayer(t.contentDiv), t.setParent(null), t.isAttachedToDOM = !1, t.div.remove();
          this.div = null, this.#l.clear(), this.#o.removeLayer(this);
        }
        #v() {
          this.#d = !0;
          for (const t of this.#l.values())
            t.isEmpty() && t.remove();
          this.#d = !1;
        }
        render({
          viewport: t
        }) {
          this.viewport = t, (0, r.setLayerDimensions)(this.div, t);
          for (const i of this.#o.getEditors(this.pageIndex))
            this.add(i), i.rebuild();
          this.updateMode();
        }
        update({
          viewport: t
        }) {
          this.#o.commitOrRemove(), this.#v();
          const i = this.viewport.rotation, h = t.rotation;
          if (this.viewport = t, (0, r.setLayerDimensions)(this.div, {
            rotation: h
          }), i !== h)
            for (const f of this.#l.values())
              f.rotate(h);
          this.addInkEditorIfNeeded(!1);
        }
        get pageDimensions() {
          const {
            pageWidth: t,
            pageHeight: i
          } = this.viewport.rawDims;
          return [t, i];
        }
        get scale() {
          return this.#o.viewParameters.realScale;
        }
      }
    }
  ),
  /***/
  259: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        ColorPicker: () => (
          /* binding */
          U
        )
        /* harmony export */
      });
      var y = V(292), B = V(830), N = V(419);
      class U {
        #t = this.#g.bind(this);
        #e = this.#A.bind(this);
        #s = null;
        #n = null;
        #r;
        #i = null;
        #a = !1;
        #l = !1;
        #h = null;
        #d;
        #u = null;
        #c;
        static get _keyboardManager() {
          return (0, y.shadow)(this, "_keyboardManager", new B.KeyboardManager([[["Escape", "mac+Escape"], U.prototype._hideDropdownFromKeyboard], [[" ", "mac+ "], U.prototype._colorSelectFromKeyboard], [["ArrowDown", "ArrowRight", "mac+ArrowDown", "mac+ArrowRight"], U.prototype._moveToNext], [["ArrowUp", "ArrowLeft", "mac+ArrowUp", "mac+ArrowLeft"], U.prototype._moveToPrevious], [["Home", "mac+Home"], U.prototype._moveToBeginning], [["End", "mac+End"], U.prototype._moveToEnd]]));
        }
        constructor({
          editor: C = null,
          uiManager: x = null
        }) {
          C ? (this.#l = !1, this.#c = y.AnnotationEditorParamsType.HIGHLIGHT_COLOR, this.#h = C) : (this.#l = !0, this.#c = y.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR), this.#u = C?._uiManager || x, this.#d = this.#u._eventBus, this.#r = C?.color || this.#u?.highlightColors.values().next().value || "#FFFF98";
        }
        renderButton() {
          const C = this.#s = document.createElement("button");
          C.className = "colorPicker", C.tabIndex = "0", C.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-button"), C.setAttribute("aria-haspopup", !0), C.addEventListener("click", this.#f.bind(this)), C.addEventListener("keydown", this.#t);
          const x = this.#n = document.createElement("span");
          return x.className = "swatch", x.setAttribute("aria-hidden", !0), x.style.backgroundColor = this.#r, C.append(x), C;
        }
        renderMainDropdown() {
          const C = this.#i = this.#o();
          return C.setAttribute("aria-orientation", "horizontal"), C.setAttribute("aria-labelledby", "highlightColorPickerLabel"), C;
        }
        #o() {
          const C = document.createElement("div");
          C.addEventListener("contextmenu", N.noContextMenu), C.className = "dropdown", C.role = "listbox", C.setAttribute("aria-multiselectable", !1), C.setAttribute("aria-orientation", "vertical"), C.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-dropdown");
          for (const [x, A] of this.#u.highlightColors) {
            const r = document.createElement("button");
            r.tabIndex = "0", r.role = "option", r.setAttribute("data-color", A), r.title = x, r.setAttribute("data-l10n-id", `pdfjs-editor-colorpicker-${x}`);
            const d = document.createElement("span");
            r.append(d), d.className = "swatch", d.style.backgroundColor = A, r.setAttribute("aria-selected", A === this.#r), r.addEventListener("click", this.#p.bind(this, A)), C.append(r);
          }
          return C.addEventListener("keydown", this.#t), C;
        }
        #p(C, x) {
          x.stopPropagation(), this.#d.dispatch("switchannotationeditorparams", {
            source: this,
            type: this.#c,
            value: C
          });
        }
        _colorSelectFromKeyboard(C) {
          if (C.target === this.#s) {
            this.#f(C);
            return;
          }
          const x = C.target.getAttribute("data-color");
          x && this.#p(x, C);
        }
        _moveToNext(C) {
          if (!this.#m) {
            this.#f(C);
            return;
          }
          if (C.target === this.#s) {
            this.#i.firstChild?.focus();
            return;
          }
          C.target.nextSibling?.focus();
        }
        _moveToPrevious(C) {
          if (C.target === this.#i?.firstChild || C.target === this.#s) {
            this.#m && this._hideDropdownFromKeyboard();
            return;
          }
          this.#m || this.#f(C), C.target.previousSibling?.focus();
        }
        _moveToBeginning(C) {
          if (!this.#m) {
            this.#f(C);
            return;
          }
          this.#i.firstChild?.focus();
        }
        _moveToEnd(C) {
          if (!this.#m) {
            this.#f(C);
            return;
          }
          this.#i.lastChild?.focus();
        }
        #g(C) {
          U._keyboardManager.exec(this, C);
        }
        #f(C) {
          if (this.#m) {
            this.hideDropdown();
            return;
          }
          if (this.#a = C.detail === 0, window.addEventListener("pointerdown", this.#e), this.#i) {
            this.#i.classList.remove("hidden");
            return;
          }
          const x = this.#i = this.#o();
          this.#s.append(x);
        }
        #A(C) {
          this.#i?.contains(C.target) || this.hideDropdown();
        }
        hideDropdown() {
          this.#i?.classList.add("hidden"), window.removeEventListener("pointerdown", this.#e);
        }
        get #m() {
          return this.#i && !this.#i.classList.contains("hidden");
        }
        _hideDropdownFromKeyboard() {
          if (!this.#l) {
            if (!this.#m) {
              this.#h?.unselect();
              return;
            }
            this.hideDropdown(), this.#s.focus({
              preventScroll: !0,
              focusVisible: this.#a
            });
          }
        }
        updateColor(C) {
          if (this.#n && (this.#n.style.backgroundColor = C), !this.#i)
            return;
          const x = this.#u.highlightColors.values();
          for (const A of this.#i.children)
            A.setAttribute("aria-selected", x.next().value === C);
        }
        destroy() {
          this.#s?.remove(), this.#s = null, this.#n = null, this.#i?.remove(), this.#i = null;
        }
      }
    }
  ),
  /***/
  310: (
    /***/
    (at, W, V) => {
      V.d(W, {
        AnnotationEditor: () => (
          /* binding */
          C
        )
      });
      var y = V(830), B = V(292), N = V(419);
      class U {
        #t = "";
        #e = !1;
        #s = null;
        #n = null;
        #r = null;
        #i = !1;
        #a = null;
        static _l10nPromise = null;
        constructor(r) {
          this.#a = r;
        }
        static initialize(r) {
          U._l10nPromise ||= r;
        }
        async render() {
          const r = this.#s = document.createElement("button");
          r.className = "altText";
          const d = await U._l10nPromise.get("pdfjs-editor-alt-text-button-label");
          r.textContent = d, r.setAttribute("aria-label", d), r.tabIndex = "0", r.addEventListener("contextmenu", N.noContextMenu), r.addEventListener("pointerdown", (m) => m.stopPropagation());
          const c = (m) => {
            m.preventDefault(), this.#a._uiManager.editAltText(this.#a);
          };
          return r.addEventListener("click", c, {
            capture: !0
          }), r.addEventListener("keydown", (m) => {
            m.target === r && m.key === "Enter" && (this.#i = !0, c(m));
          }), await this.#l(), r;
        }
        finish() {
          this.#s && (this.#s.focus({
            focusVisible: this.#i
          }), this.#i = !1);
        }
        isEmpty() {
          return !this.#t && !this.#e;
        }
        get data() {
          return {
            altText: this.#t,
            decorative: this.#e
          };
        }
        set data({
          altText: r,
          decorative: d
        }) {
          this.#t === r && this.#e === d || (this.#t = r, this.#e = d, this.#l());
        }
        toggle(r = !1) {
          this.#s && (!r && this.#r && (clearTimeout(this.#r), this.#r = null), this.#s.disabled = !r);
        }
        destroy() {
          this.#s?.remove(), this.#s = null, this.#n = null;
        }
        async #l() {
          const r = this.#s;
          if (!r)
            return;
          if (!this.#t && !this.#e) {
            r.classList.remove("done"), this.#n?.remove();
            return;
          }
          r.classList.add("done"), U._l10nPromise.get("pdfjs-editor-alt-text-edit-button-label").then((m) => {
            r.setAttribute("aria-label", m);
          });
          let d = this.#n;
          if (!d) {
            this.#n = d = document.createElement("span"), d.className = "tooltip", d.setAttribute("role", "tooltip");
            const m = d.id = `alt-text-tooltip-${this.#a.id}`;
            r.setAttribute("aria-describedby", m);
            const s = 100;
            r.addEventListener("mouseenter", () => {
              this.#r = setTimeout(() => {
                this.#r = null, this.#n.classList.add("show"), this.#a._reportTelemetry({
                  action: "alt_text_tooltip"
                });
              }, s);
            }), r.addEventListener("mouseleave", () => {
              this.#r && (clearTimeout(this.#r), this.#r = null), this.#n?.classList.remove("show");
            });
          }
          d.innerText = this.#e ? await U._l10nPromise.get("pdfjs-editor-alt-text-decorative-tooltip") : this.#t, d.parentNode || r.append(d), this.#a.getImageForAltText()?.setAttribute("aria-describedby", d.id);
        }
      }
      var L = V(362);
      class C {
        #t = null;
        #e = null;
        #s = !1;
        #n = !1;
        #r = null;
        #i = null;
        #a = this.focusin.bind(this);
        #l = this.focusout.bind(this);
        #h = null;
        #d = "";
        #u = !1;
        #c = null;
        #o = !1;
        #p = !1;
        #g = !1;
        #f = null;
        #A = 0;
        #m = 0;
        #v = null;
        _initialOptions = /* @__PURE__ */ Object.create(null);
        _isVisible = !0;
        _uiManager = null;
        _focusEventsAllowed = !0;
        _l10nPromise = null;
        #w = !1;
        #C = C._zIndex++;
        static _borderLineWidth = -1;
        static _colorManager = new y.ColorManager();
        static _zIndex = 1;
        static _telemetryTimeout = 1e3;
        static get _resizerKeyboardManager() {
          const r = C.prototype._resizeWithKeyboard, d = y.AnnotationEditorUIManager.TRANSLATE_SMALL, c = y.AnnotationEditorUIManager.TRANSLATE_BIG;
          return (0, B.shadow)(this, "_resizerKeyboardManager", new y.KeyboardManager([[["ArrowLeft", "mac+ArrowLeft"], r, {
            args: [-d, 0]
          }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], r, {
            args: [-c, 0]
          }], [["ArrowRight", "mac+ArrowRight"], r, {
            args: [d, 0]
          }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], r, {
            args: [c, 0]
          }], [["ArrowUp", "mac+ArrowUp"], r, {
            args: [0, -d]
          }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], r, {
            args: [0, -c]
          }], [["ArrowDown", "mac+ArrowDown"], r, {
            args: [0, d]
          }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], r, {
            args: [0, c]
          }], [["Escape", "mac+Escape"], C.prototype._stopResizingWithKeyboard]]));
        }
        constructor(r) {
          this.constructor === C && (0, B.unreachable)("Cannot initialize AnnotationEditor."), this.parent = r.parent, this.id = r.id, this.width = this.height = null, this.pageIndex = r.parent.pageIndex, this.name = r.name, this.div = null, this._uiManager = r.uiManager, this.annotationElementId = null, this._willKeepAspectRatio = !1, this._initialOptions.isCentered = r.isCentered, this._structTreeParentId = null;
          const {
            rotation: d,
            rawDims: {
              pageWidth: c,
              pageHeight: m,
              pageX: s,
              pageY: g
            }
          } = this.parent.viewport;
          this.rotation = d, this.pageRotation = (360 + d - this._uiManager.viewParameters.rotation) % 360, this.pageDimensions = [c, m], this.pageTranslation = [s, g];
          const [t, i] = this.parentDimensions;
          this.x = r.x / t, this.y = r.y / i, this.isAttachedToDOM = !1, this.deleted = !1;
        }
        get editorType() {
          return Object.getPrototypeOf(this).constructor._type;
        }
        static get _defaultLineColor() {
          return (0, B.shadow)(this, "_defaultLineColor", this._colorManager.getHexCode("CanvasText"));
        }
        static deleteAnnotationElement(r) {
          const d = new x({
            id: r.parent.getNextId(),
            parent: r.parent,
            uiManager: r._uiManager
          });
          d.annotationElementId = r.annotationElementId, d.deleted = !0, d._uiManager.addToAnnotationStorage(d);
        }
        static initialize(r, d, c) {
          if (C._l10nPromise ||= new Map(["pdfjs-editor-alt-text-button-label", "pdfjs-editor-alt-text-edit-button-label", "pdfjs-editor-alt-text-decorative-tooltip", "pdfjs-editor-resizer-label-topLeft", "pdfjs-editor-resizer-label-topMiddle", "pdfjs-editor-resizer-label-topRight", "pdfjs-editor-resizer-label-middleRight", "pdfjs-editor-resizer-label-bottomRight", "pdfjs-editor-resizer-label-bottomMiddle", "pdfjs-editor-resizer-label-bottomLeft", "pdfjs-editor-resizer-label-middleLeft"].map((s) => [s, r.get(s.replaceAll(/([A-Z])/g, (g) => `-${g.toLowerCase()}`))])), c?.strings)
            for (const s of c.strings)
              C._l10nPromise.set(s, r.get(s));
          if (C._borderLineWidth !== -1)
            return;
          const m = getComputedStyle(document.documentElement);
          C._borderLineWidth = parseFloat(m.getPropertyValue("--outline-width")) || 0;
        }
        static updateDefaultParams(r, d) {
        }
        static get defaultPropertiesToUpdate() {
          return [];
        }
        static isHandlingMimeForPasting(r) {
          return !1;
        }
        static paste(r, d) {
          (0, B.unreachable)("Not implemented");
        }
        get propertiesToUpdate() {
          return [];
        }
        get _isDraggable() {
          return this.#w;
        }
        set _isDraggable(r) {
          this.#w = r, this.div?.classList.toggle("draggable", r);
        }
        get isEnterHandled() {
          return !0;
        }
        center() {
          const [r, d] = this.pageDimensions;
          switch (this.parentRotation) {
            case 90:
              this.x -= this.height * d / (r * 2), this.y += this.width * r / (d * 2);
              break;
            case 180:
              this.x += this.width / 2, this.y += this.height / 2;
              break;
            case 270:
              this.x += this.height * d / (r * 2), this.y -= this.width * r / (d * 2);
              break;
            default:
              this.x -= this.width / 2, this.y -= this.height / 2;
              break;
          }
          this.fixAndSetPosition();
        }
        addCommands(r) {
          this._uiManager.addCommands(r);
        }
        get currentLayer() {
          return this._uiManager.currentLayer;
        }
        setInBackground() {
          this.div.style.zIndex = 0;
        }
        setInForeground() {
          this.div.style.zIndex = this.#C;
        }
        setParent(r) {
          r !== null ? (this.pageIndex = r.pageIndex, this.pageDimensions = r.pageDimensions) : this.#D(), this.parent = r;
        }
        focusin(r) {
          this._focusEventsAllowed && (this.#u ? this.#u = !1 : this.parent.setSelected(this));
        }
        focusout(r) {
          !this._focusEventsAllowed || !this.isAttachedToDOM || r.relatedTarget?.closest(`#${this.id}`) || (r.preventDefault(), this.parent?.isMultipleSelection || this.commitOrRemove());
        }
        commitOrRemove() {
          this.isEmpty() ? this.remove() : this.commit();
        }
        commit() {
          this.addToAnnotationStorage();
        }
        addToAnnotationStorage() {
          this._uiManager.addToAnnotationStorage(this);
        }
        setAt(r, d, c, m) {
          const [s, g] = this.parentDimensions;
          [c, m] = this.screenToPageTranslation(c, m), this.x = (r + c) / s, this.y = (d + m) / g, this.fixAndSetPosition();
        }
        #R([r, d], c, m) {
          [c, m] = this.screenToPageTranslation(c, m), this.x += c / r, this.y += m / d, this.fixAndSetPosition();
        }
        translate(r, d) {
          this.#R(this.parentDimensions, r, d);
        }
        translateInPage(r, d) {
          this.#c ||= [this.x, this.y], this.#R(this.pageDimensions, r, d), this.div.scrollIntoView({
            block: "nearest"
          });
        }
        drag(r, d) {
          this.#c ||= [this.x, this.y];
          const [c, m] = this.parentDimensions;
          if (this.x += r / c, this.y += d / m, this.parent && (this.x < 0 || this.x > 1 || this.y < 0 || this.y > 1)) {
            const {
              x: h,
              y: f
            } = this.div.getBoundingClientRect();
            this.parent.findNewParent(this, h, f) && (this.x -= Math.floor(this.x), this.y -= Math.floor(this.y));
          }
          let {
            x: s,
            y: g
          } = this;
          const [t, i] = this.getBaseTranslation();
          s += t, g += i, this.div.style.left = `${(100 * s).toFixed(2)}%`, this.div.style.top = `${(100 * g).toFixed(2)}%`, this.div.scrollIntoView({
            block: "nearest"
          });
        }
        get _hasBeenMoved() {
          return !!this.#c && (this.#c[0] !== this.x || this.#c[1] !== this.y);
        }
        getBaseTranslation() {
          const [r, d] = this.parentDimensions, {
            _borderLineWidth: c
          } = C, m = c / r, s = c / d;
          switch (this.rotation) {
            case 90:
              return [-m, s];
            case 180:
              return [m, s];
            case 270:
              return [m, -s];
            default:
              return [-m, -s];
          }
        }
        get _mustFixPosition() {
          return !0;
        }
        fixAndSetPosition(r = this.rotation) {
          const [d, c] = this.pageDimensions;
          let {
            x: m,
            y: s,
            width: g,
            height: t
          } = this;
          if (g *= d, t *= c, m *= d, s *= c, this._mustFixPosition)
            switch (r) {
              case 0:
                m = Math.max(0, Math.min(d - g, m)), s = Math.max(0, Math.min(c - t, s));
                break;
              case 90:
                m = Math.max(0, Math.min(d - t, m)), s = Math.min(c, Math.max(g, s));
                break;
              case 180:
                m = Math.min(d, Math.max(g, m)), s = Math.min(c, Math.max(t, s));
                break;
              case 270:
                m = Math.min(d, Math.max(t, m)), s = Math.max(0, Math.min(c - g, s));
                break;
            }
          this.x = m /= d, this.y = s /= c;
          const [i, h] = this.getBaseTranslation();
          m += i, s += h;
          const {
            style: f
          } = this.div;
          f.left = `${(100 * m).toFixed(2)}%`, f.top = `${(100 * s).toFixed(2)}%`, this.moveInDOM();
        }
        static #I(r, d, c) {
          switch (c) {
            case 90:
              return [d, -r];
            case 180:
              return [-r, -d];
            case 270:
              return [-d, r];
            default:
              return [r, d];
          }
        }
        screenToPageTranslation(r, d) {
          return C.#I(r, d, this.parentRotation);
        }
        pageTranslationToScreen(r, d) {
          return C.#I(r, d, 360 - this.parentRotation);
        }
        #P(r) {
          switch (r) {
            case 90: {
              const [d, c] = this.pageDimensions;
              return [0, -d / c, c / d, 0];
            }
            case 180:
              return [-1, 0, 0, -1];
            case 270: {
              const [d, c] = this.pageDimensions;
              return [0, d / c, -c / d, 0];
            }
            default:
              return [1, 0, 0, 1];
          }
        }
        get parentScale() {
          return this._uiManager.viewParameters.realScale;
        }
        get parentRotation() {
          return (this._uiManager.viewParameters.rotation + this.pageRotation) % 360;
        }
        get parentDimensions() {
          const {
            parentScale: r,
            pageDimensions: [d, c]
          } = this, m = d * r, s = c * r;
          return B.FeatureTest.isCSSRoundSupported ? [Math.round(m), Math.round(s)] : [m, s];
        }
        setDims(r, d) {
          const [c, m] = this.parentDimensions;
          this.div.style.width = `${(100 * r / c).toFixed(2)}%`, this.#n || (this.div.style.height = `${(100 * d / m).toFixed(2)}%`);
        }
        fixDims() {
          const {
            style: r
          } = this.div, {
            height: d,
            width: c
          } = r, m = c.endsWith("%"), s = !this.#n && d.endsWith("%");
          if (m && s)
            return;
          const [g, t] = this.parentDimensions;
          m || (r.width = `${(100 * parseFloat(c) / g).toFixed(2)}%`), !this.#n && !s && (r.height = `${(100 * parseFloat(d) / t).toFixed(2)}%`);
        }
        getInitialTranslation() {
          return [0, 0];
        }
        #y() {
          if (this.#r)
            return;
          this.#r = document.createElement("div"), this.#r.classList.add("resizers");
          const r = this._willKeepAspectRatio ? ["topLeft", "topRight", "bottomRight", "bottomLeft"] : ["topLeft", "topMiddle", "topRight", "middleRight", "bottomRight", "bottomMiddle", "bottomLeft", "middleLeft"];
          for (const d of r) {
            const c = document.createElement("div");
            this.#r.append(c), c.classList.add("resizer", d), c.setAttribute("data-resizer-name", d), c.addEventListener("pointerdown", this.#b.bind(this, d)), c.addEventListener("contextmenu", N.noContextMenu), c.tabIndex = -1;
          }
          this.div.prepend(this.#r);
        }
        #b(r, d) {
          d.preventDefault();
          const {
            isMac: c
          } = B.FeatureTest.platform;
          if (d.button !== 0 || d.ctrlKey && c)
            return;
          this.#e?.toggle(!1);
          const m = this.#E.bind(this, r), s = this._isDraggable;
          this._isDraggable = !1;
          const g = {
            passive: !0,
            capture: !0
          };
          this.parent.togglePointerEvents(!1), window.addEventListener("pointermove", m, g), window.addEventListener("contextmenu", N.noContextMenu);
          const t = this.x, i = this.y, h = this.width, f = this.height, w = this.parent.div.style.cursor, S = this.div.style.cursor;
          this.div.style.cursor = this.parent.div.style.cursor = window.getComputedStyle(d.target).cursor;
          const P = () => {
            this.parent.togglePointerEvents(!0), this.#e?.toggle(!0), this._isDraggable = s, window.removeEventListener("pointerup", P), window.removeEventListener("blur", P), window.removeEventListener("pointermove", m, g), window.removeEventListener("contextmenu", N.noContextMenu), this.parent.div.style.cursor = w, this.div.style.cursor = S, this.#S(t, i, h, f);
          };
          window.addEventListener("pointerup", P), window.addEventListener("blur", P);
        }
        #S(r, d, c, m) {
          const s = this.x, g = this.y, t = this.width, i = this.height;
          s === r && g === d && t === c && i === m || this.addCommands({
            cmd: () => {
              this.width = t, this.height = i, this.x = s, this.y = g;
              const [h, f] = this.parentDimensions;
              this.setDims(h * t, f * i), this.fixAndSetPosition();
            },
            undo: () => {
              this.width = c, this.height = m, this.x = r, this.y = d;
              const [h, f] = this.parentDimensions;
              this.setDims(h * c, f * m), this.fixAndSetPosition();
            },
            mustExec: !0
          });
        }
        #E(r, d) {
          const [c, m] = this.parentDimensions, s = this.x, g = this.y, t = this.width, i = this.height, h = C.MIN_SIZE / c, f = C.MIN_SIZE / m, w = (b) => Math.round(b * 1e4) / 1e4, S = this.#P(this.rotation), P = (b, l) => [S[0] * b + S[2] * l, S[1] * b + S[3] * l], M = this.#P(360 - this.rotation), O = (b, l) => [M[0] * b + M[2] * l, M[1] * b + M[3] * l];
          let _, z, K = !1, nt = !1;
          switch (r) {
            case "topLeft":
              K = !0, _ = (b, l) => [0, 0], z = (b, l) => [b, l];
              break;
            case "topMiddle":
              _ = (b, l) => [b / 2, 0], z = (b, l) => [b / 2, l];
              break;
            case "topRight":
              K = !0, _ = (b, l) => [b, 0], z = (b, l) => [0, l];
              break;
            case "middleRight":
              nt = !0, _ = (b, l) => [b, l / 2], z = (b, l) => [0, l / 2];
              break;
            case "bottomRight":
              K = !0, _ = (b, l) => [b, l], z = (b, l) => [0, 0];
              break;
            case "bottomMiddle":
              _ = (b, l) => [b / 2, l], z = (b, l) => [b / 2, 0];
              break;
            case "bottomLeft":
              K = !0, _ = (b, l) => [0, l], z = (b, l) => [b, 0];
              break;
            case "middleLeft":
              nt = !0, _ = (b, l) => [0, l / 2], z = (b, l) => [b, l / 2];
              break;
          }
          const j = _(t, i), H = z(t, i);
          let G = P(...H);
          const Y = w(s + G[0]), et = w(g + G[1]);
          let tt = 1, ot = 1, [ct, pt] = this.screenToPageTranslation(d.movementX, d.movementY);
          if ([ct, pt] = O(ct / c, pt / m), K) {
            const b = Math.hypot(t, i);
            tt = ot = Math.max(Math.min(Math.hypot(H[0] - j[0] - ct, H[1] - j[1] - pt) / b, 1 / t, 1 / i), h / t, f / i);
          } else nt ? tt = Math.max(h, Math.min(1, Math.abs(H[0] - j[0] - ct))) / t : ot = Math.max(f, Math.min(1, Math.abs(H[1] - j[1] - pt))) / i;
          const dt = w(t * tt), ht = w(i * ot);
          G = P(...z(dt, ht));
          const ut = Y - G[0], st = et - G[1];
          this.width = dt, this.height = ht, this.x = ut, this.y = st, this.setDims(c * dt, m * ht), this.fixAndSetPosition();
        }
        altTextFinish() {
          this.#e?.finish();
        }
        async addEditToolbar() {
          return this.#h || this.#p ? this.#h : (this.#h = new L.EditorToolbar(this), this.div.append(this.#h.render()), this.#e && this.#h.addAltTextButton(await this.#e.render()), this.#h);
        }
        removeEditToolbar() {
          this.#h && (this.#h.remove(), this.#h = null, this.#e?.destroy());
        }
        getClientDimensions() {
          return this.div.getBoundingClientRect();
        }
        async addAltTextButton() {
          this.#e || (U.initialize(C._l10nPromise), this.#e = new U(this), await this.addEditToolbar());
        }
        get altTextData() {
          return this.#e?.data;
        }
        set altTextData(r) {
          this.#e && (this.#e.data = r);
        }
        hasAltText() {
          return !this.#e?.isEmpty();
        }
        render() {
          this.div = document.createElement("div"), this.div.setAttribute("data-editor-rotation", (360 - this.rotation) % 360), this.div.className = this.name, this.div.setAttribute("id", this.id), this.div.tabIndex = this.#s ? -1 : 0, this._isVisible || this.div.classList.add("hidden"), this.setInForeground(), this.div.addEventListener("focusin", this.#a), this.div.addEventListener("focusout", this.#l);
          const [r, d] = this.parentDimensions;
          this.parentRotation % 180 !== 0 && (this.div.style.maxWidth = `${(100 * d / r).toFixed(2)}%`, this.div.style.maxHeight = `${(100 * r / d).toFixed(2)}%`);
          const [c, m] = this.getInitialTranslation();
          return this.translate(c, m), (0, y.bindEvents)(this, this.div, ["pointerdown"]), this.div;
        }
        pointerdown(r) {
          const {
            isMac: d
          } = B.FeatureTest.platform;
          if (r.button !== 0 || r.ctrlKey && d) {
            r.preventDefault();
            return;
          }
          if (this.#u = !0, this._isDraggable) {
            this.#T(r);
            return;
          }
          this.#k(r);
        }
        #k(r) {
          const {
            isMac: d
          } = B.FeatureTest.platform;
          r.ctrlKey && !d || r.shiftKey || r.metaKey && d ? this.parent.toggleSelected(this) : this.parent.setSelected(this);
        }
        #T(r) {
          const d = this._uiManager.isSelected(this);
          this._uiManager.setUpDragSession();
          let c, m;
          d && (this.div.classList.add("moving"), c = {
            passive: !0,
            capture: !0
          }, this.#A = r.clientX, this.#m = r.clientY, m = (g) => {
            const {
              clientX: t,
              clientY: i
            } = g, [h, f] = this.screenToPageTranslation(t - this.#A, i - this.#m);
            this.#A = t, this.#m = i, this._uiManager.dragSelectedEditors(h, f);
          }, window.addEventListener("pointermove", m, c));
          const s = () => {
            window.removeEventListener("pointerup", s), window.removeEventListener("blur", s), d && (this.div.classList.remove("moving"), window.removeEventListener("pointermove", m, c)), this.#u = !1, this._uiManager.endDragSession() || this.#k(r);
          };
          window.addEventListener("pointerup", s), window.addEventListener("blur", s);
        }
        moveInDOM() {
          this.#f && clearTimeout(this.#f), this.#f = setTimeout(() => {
            this.#f = null, this.parent?.moveEditorInDOM(this);
          }, 0);
        }
        _setParentAndPosition(r, d, c) {
          r.changeParent(this), this.x = d, this.y = c, this.fixAndSetPosition();
        }
        getRect(r, d, c = this.rotation) {
          const m = this.parentScale, [s, g] = this.pageDimensions, [t, i] = this.pageTranslation, h = r / m, f = d / m, w = this.x * s, S = this.y * g, P = this.width * s, M = this.height * g;
          switch (c) {
            case 0:
              return [w + h + t, g - S - f - M + i, w + h + P + t, g - S - f + i];
            case 90:
              return [w + f + t, g - S + h + i, w + f + M + t, g - S + h + P + i];
            case 180:
              return [w - h - P + t, g - S + f + i, w - h + t, g - S + f + M + i];
            case 270:
              return [w - f - M + t, g - S - h - P + i, w - f + t, g - S - h + i];
            default:
              throw new Error("Invalid rotation");
          }
        }
        getRectInCurrentCoords(r, d) {
          const [c, m, s, g] = r, t = s - c, i = g - m;
          switch (this.rotation) {
            case 0:
              return [c, d - g, t, i];
            case 90:
              return [c, d - m, i, t];
            case 180:
              return [s, d - m, t, i];
            case 270:
              return [s, d - g, i, t];
            default:
              throw new Error("Invalid rotation");
          }
        }
        onceAdded() {
        }
        isEmpty() {
          return !1;
        }
        enableEditMode() {
          this.#p = !0;
        }
        disableEditMode() {
          this.#p = !1;
        }
        isInEditMode() {
          return this.#p;
        }
        shouldGetKeyboardEvents() {
          return this.#g;
        }
        needsToBeRebuilt() {
          return this.div && !this.isAttachedToDOM;
        }
        rebuild() {
          this.div?.addEventListener("focusin", this.#a), this.div?.addEventListener("focusout", this.#l);
        }
        rotate(r) {
        }
        serialize(r = !1, d = null) {
          (0, B.unreachable)("An editor must be serializable");
        }
        static deserialize(r, d, c) {
          const m = new this.prototype.constructor({
            parent: d,
            id: d.getNextId(),
            uiManager: c
          });
          m.rotation = r.rotation;
          const [s, g] = m.pageDimensions, [t, i, h, f] = m.getRectInCurrentCoords(r.rect, g);
          return m.x = t / s, m.y = i / g, m.width = h / s, m.height = f / g, m;
        }
        get hasBeenModified() {
          return !!this.annotationElementId && (this.deleted || this.serialize() !== null);
        }
        remove() {
          if (this.div.removeEventListener("focusin", this.#a), this.div.removeEventListener("focusout", this.#l), this.isEmpty() || this.commit(), this.parent ? this.parent.remove(this) : this._uiManager.removeEditor(this), this.#f && (clearTimeout(this.#f), this.#f = null), this.#D(), this.removeEditToolbar(), this.#v) {
            for (const r of this.#v.values())
              clearTimeout(r);
            this.#v = null;
          }
          this.parent = null;
        }
        get isResizable() {
          return !1;
        }
        makeResizable() {
          this.isResizable && (this.#y(), this.#r.classList.remove("hidden"), (0, y.bindEvents)(this, this.div, ["keydown"]));
        }
        get toolbarPosition() {
          return null;
        }
        keydown(r) {
          if (!this.isResizable || r.target !== this.div || r.key !== "Enter")
            return;
          this._uiManager.setSelected(this), this.#i = {
            savedX: this.x,
            savedY: this.y,
            savedWidth: this.width,
            savedHeight: this.height
          };
          const d = this.#r.children;
          if (!this.#t) {
            this.#t = Array.from(d);
            const g = this.#M.bind(this), t = this.#F.bind(this);
            for (const i of this.#t) {
              const h = i.getAttribute("data-resizer-name");
              i.setAttribute("role", "spinbutton"), i.addEventListener("keydown", g), i.addEventListener("blur", t), i.addEventListener("focus", this.#N.bind(this, h)), C._l10nPromise.get(`pdfjs-editor-resizer-label-${h}`).then((f) => i.setAttribute("aria-label", f));
            }
          }
          const c = this.#t[0];
          let m = 0;
          for (const g of d) {
            if (g === c)
              break;
            m++;
          }
          const s = (360 - this.rotation + this.parentRotation) % 360 / 90 * (this.#t.length / 4);
          if (s !== m) {
            if (s < m)
              for (let t = 0; t < m - s; t++)
                this.#r.append(this.#r.firstChild);
            else if (s > m)
              for (let t = 0; t < s - m; t++)
                this.#r.firstChild.before(this.#r.lastChild);
            let g = 0;
            for (const t of d) {
              const h = this.#t[g++].getAttribute("data-resizer-name");
              C._l10nPromise.get(`pdfjs-editor-resizer-label-${h}`).then((f) => t.setAttribute("aria-label", f));
            }
          }
          this.#L(0), this.#g = !0, this.#r.firstChild.focus({
            focusVisible: !0
          }), r.preventDefault(), r.stopImmediatePropagation();
        }
        #M(r) {
          C._resizerKeyboardManager.exec(this, r);
        }
        #F(r) {
          this.#g && r.relatedTarget?.parentNode !== this.#r && this.#D();
        }
        #N(r) {
          this.#d = this.#g ? r : "";
        }
        #L(r) {
          if (this.#t)
            for (const d of this.#t)
              d.tabIndex = r;
        }
        _resizeWithKeyboard(r, d) {
          this.#g && this.#E(this.#d, {
            movementX: r,
            movementY: d
          });
        }
        #D() {
          if (this.#g = !1, this.#L(-1), this.#i) {
            const {
              savedX: r,
              savedY: d,
              savedWidth: c,
              savedHeight: m
            } = this.#i;
            this.#S(r, d, c, m), this.#i = null;
          }
        }
        _stopResizingWithKeyboard() {
          this.#D(), this.div.focus();
        }
        select() {
          if (this.makeResizable(), this.div?.classList.add("selectedEditor"), !this.#h) {
            this.addEditToolbar().then(() => {
              this.div?.classList.contains("selectedEditor") && this.#h?.show();
            });
            return;
          }
          this.#h?.show();
        }
        unselect() {
          this.#r?.classList.add("hidden"), this.div?.classList.remove("selectedEditor"), this.div?.contains(document.activeElement) && this._uiManager.currentLayer.div.focus({
            preventScroll: !0
          }), this.#h?.hide();
        }
        updateParams(r, d) {
        }
        disableEditing() {
        }
        enableEditing() {
        }
        enterInEditMode() {
        }
        getImageForAltText() {
          return null;
        }
        get contentDiv() {
          return this.div;
        }
        get isEditing() {
          return this.#o;
        }
        set isEditing(r) {
          this.#o = r, this.parent && (r ? (this.parent.setSelected(this), this.parent.setActiveEditor(this)) : this.parent.setActiveEditor(null));
        }
        setAspectRatio(r, d) {
          this.#n = !0;
          const c = r / d, {
            style: m
          } = this.div;
          m.aspectRatio = c, m.height = "auto";
        }
        static get MIN_SIZE() {
          return 16;
        }
        static canCreateNewEmptyEditor() {
          return !0;
        }
        get telemetryInitialData() {
          return {
            action: "added"
          };
        }
        get telemetryFinalData() {
          return null;
        }
        _reportTelemetry(r, d = !1) {
          if (d) {
            this.#v ||= /* @__PURE__ */ new Map();
            const {
              action: c
            } = r;
            let m = this.#v.get(c);
            m && clearTimeout(m), m = setTimeout(() => {
              this._reportTelemetry(r), this.#v.delete(c), this.#v.size === 0 && (this.#v = null);
            }, C._telemetryTimeout), this.#v.set(c, m);
            return;
          }
          r.type ||= this.editorType, this._uiManager._eventBus.dispatch("reporttelemetry", {
            source: this,
            details: {
              type: "editing",
              data: r
            }
          });
        }
        show(r = this._isVisible) {
          this.div.classList.toggle("hidden", !r), this._isVisible = r;
        }
        enable() {
          this.div && (this.div.tabIndex = 0), this.#s = !1;
        }
        disable() {
          this.div && (this.div.tabIndex = -1), this.#s = !0;
        }
        renderAnnotationElement(r) {
          let d = r.container.querySelector(".annotationContent");
          if (!d)
            d = document.createElement("div"), d.classList.add("annotationContent", this.editorType), r.container.prepend(d);
          else if (d.nodeName === "CANVAS") {
            const c = d;
            d = document.createElement("div"), d.classList.add("annotationContent", this.editorType), c.before(d);
          }
          return d;
        }
        resetAnnotationElement(r) {
          const {
            firstChild: d
          } = r.container;
          d.nodeName === "DIV" && d.classList.contains("annotationContent") && d.remove();
        }
      }
      class x extends C {
        constructor(r) {
          super(r), this.annotationElementId = r.annotationElementId, this.deleted = !0;
        }
        serialize() {
          return {
            id: this.annotationElementId,
            deleted: !0,
            pageIndex: this.pageIndex
          };
        }
      }
    }
  ),
  /***/
  61: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        FreeOutliner: () => (
          /* binding */
          L
        ),
        /* harmony export */
        Outliner: () => (
          /* binding */
          B
        )
        /* harmony export */
      });
      var y = V(292);
      class B {
        #t;
        #e = [];
        #s = [];
        constructor(A, r = 0, d = 0, c = !0) {
          let m = 1 / 0, s = -1 / 0, g = 1 / 0, t = -1 / 0;
          const h = 10 ** -4;
          for (const {
            x: _,
            y: z,
            width: K,
            height: nt
          } of A) {
            const j = Math.floor((_ - r) / h) * h, H = Math.ceil((_ + K + r) / h) * h, G = Math.floor((z - r) / h) * h, Y = Math.ceil((z + nt + r) / h) * h, et = [j, G, Y, !0], tt = [H, G, Y, !1];
            this.#e.push(et, tt), m = Math.min(m, j), s = Math.max(s, H), g = Math.min(g, G), t = Math.max(t, Y);
          }
          const f = s - m + 2 * d, w = t - g + 2 * d, S = m - d, P = g - d, M = this.#e.at(c ? -1 : -2), O = [M[0], M[2]];
          for (const _ of this.#e) {
            const [z, K, nt] = _;
            _[0] = (z - S) / f, _[1] = (K - P) / w, _[2] = (nt - P) / w;
          }
          this.#t = {
            x: S,
            y: P,
            width: f,
            height: w,
            lastPoint: O
          };
        }
        getOutlines() {
          this.#e.sort((r, d) => r[0] - d[0] || r[1] - d[1] || r[2] - d[2]);
          const A = [];
          for (const r of this.#e)
            r[3] ? (A.push(...this.#l(r)), this.#i(r)) : (this.#a(r), A.push(...this.#l(r)));
          return this.#n(A);
        }
        #n(A) {
          const r = [], d = /* @__PURE__ */ new Set();
          for (const s of A) {
            const [g, t, i] = s;
            r.push([g, t, s], [g, i, s]);
          }
          r.sort((s, g) => s[1] - g[1] || s[0] - g[0]);
          for (let s = 0, g = r.length; s < g; s += 2) {
            const t = r[s][2], i = r[s + 1][2];
            t.push(i), i.push(t), d.add(t), d.add(i);
          }
          const c = [];
          let m;
          for (; d.size > 0; ) {
            const s = d.values().next().value;
            let [g, t, i, h, f] = s;
            d.delete(s);
            let w = g, S = t;
            for (m = [g, i], c.push(m); ; ) {
              let P;
              if (d.has(h))
                P = h;
              else if (d.has(f))
                P = f;
              else
                break;
              d.delete(P), [g, t, i, h, f] = P, w !== g && (m.push(w, S, g, S === t ? t : i), w = g), S = S === t ? i : t;
            }
            m.push(w, S);
          }
          return new U(c, this.#t);
        }
        #r(A) {
          const r = this.#s;
          let d = 0, c = r.length - 1;
          for (; d <= c; ) {
            const m = d + c >> 1, s = r[m][0];
            if (s === A)
              return m;
            s < A ? d = m + 1 : c = m - 1;
          }
          return c + 1;
        }
        #i([, A, r]) {
          const d = this.#r(A);
          this.#s.splice(d, 0, [A, r]);
        }
        #a([, A, r]) {
          const d = this.#r(A);
          for (let c = d; c < this.#s.length; c++) {
            const [m, s] = this.#s[c];
            if (m !== A)
              break;
            if (m === A && s === r) {
              this.#s.splice(c, 1);
              return;
            }
          }
          for (let c = d - 1; c >= 0; c--) {
            const [m, s] = this.#s[c];
            if (m !== A)
              break;
            if (m === A && s === r) {
              this.#s.splice(c, 1);
              return;
            }
          }
        }
        #l(A) {
          const [r, d, c] = A, m = [[r, d, c]], s = this.#r(c);
          for (let g = 0; g < s; g++) {
            const [t, i] = this.#s[g];
            for (let h = 0, f = m.length; h < f; h++) {
              const [, w, S] = m[h];
              if (!(i <= w || S <= t)) {
                if (w >= t) {
                  if (S > i)
                    m[h][1] = i;
                  else {
                    if (f === 1)
                      return [];
                    m.splice(h, 1), h--, f--;
                  }
                  continue;
                }
                m[h][2] = t, S > i && m.push([r, i, S]);
              }
            }
          }
          return m;
        }
      }
      class N {
        toSVGPath() {
          throw new Error("Abstract method `toSVGPath` must be implemented.");
        }
        get box() {
          throw new Error("Abstract getter `box` must be implemented.");
        }
        serialize(A, r) {
          throw new Error("Abstract method `serialize` must be implemented.");
        }
        get free() {
          return this instanceof C;
        }
      }
      class U extends N {
        #t;
        #e;
        constructor(A, r) {
          super(), this.#e = A, this.#t = r;
        }
        toSVGPath() {
          const A = [];
          for (const r of this.#e) {
            let [d, c] = r;
            A.push(`M${d} ${c}`);
            for (let m = 2; m < r.length; m += 2) {
              const s = r[m], g = r[m + 1];
              s === d ? (A.push(`V${g}`), c = g) : g === c && (A.push(`H${s}`), d = s);
            }
            A.push("Z");
          }
          return A.join(" ");
        }
        serialize([A, r, d, c], m) {
          const s = [], g = d - A, t = c - r;
          for (const i of this.#e) {
            const h = new Array(i.length);
            for (let f = 0; f < i.length; f += 2)
              h[f] = A + i[f] * g, h[f + 1] = c - i[f + 1] * t;
            s.push(h);
          }
          return s;
        }
        get box() {
          return this.#t;
        }
      }
      class L {
        #t;
        #e = [];
        #s;
        #n;
        #r = [];
        #i = new Float64Array(18);
        #a;
        #l;
        #h;
        #d;
        #u;
        #c;
        #o = [];
        static #p = 8;
        static #g = 2;
        static #f = L.#p + L.#g;
        constructor({
          x: A,
          y: r
        }, d, c, m, s, g = 0) {
          this.#t = d, this.#c = m * c, this.#n = s, this.#i.set([NaN, NaN, NaN, NaN, A, r], 6), this.#s = g, this.#d = L.#p * c, this.#h = L.#f * c, this.#u = c, this.#o.push(A, r);
        }
        get free() {
          return !0;
        }
        isEmpty() {
          return isNaN(this.#i[8]);
        }
        #A() {
          const A = this.#i.subarray(4, 6), r = this.#i.subarray(16, 18), [d, c, m, s] = this.#t;
          return [(this.#a + (A[0] - r[0]) / 2 - d) / m, (this.#l + (A[1] - r[1]) / 2 - c) / s, (this.#a + (r[0] - A[0]) / 2 - d) / m, (this.#l + (r[1] - A[1]) / 2 - c) / s];
        }
        add({
          x: A,
          y: r
        }) {
          this.#a = A, this.#l = r;
          const [d, c, m, s] = this.#t;
          let [g, t, i, h] = this.#i.subarray(8, 12);
          const f = A - i, w = r - h, S = Math.hypot(f, w);
          if (S < this.#h)
            return !1;
          const P = S - this.#d, M = P / S, O = M * f, _ = M * w;
          let z = g, K = t;
          g = i, t = h, i += O, h += _, this.#o?.push(A, r);
          const nt = -_ / P, j = O / P, H = nt * this.#c, G = j * this.#c;
          return this.#i.set(this.#i.subarray(2, 8), 0), this.#i.set([i + H, h + G], 4), this.#i.set(this.#i.subarray(14, 18), 12), this.#i.set([i - H, h - G], 16), isNaN(this.#i[6]) ? (this.#r.length === 0 && (this.#i.set([g + H, t + G], 2), this.#r.push(NaN, NaN, NaN, NaN, (g + H - d) / m, (t + G - c) / s), this.#i.set([g - H, t - G], 14), this.#e.push(NaN, NaN, NaN, NaN, (g - H - d) / m, (t - G - c) / s)), this.#i.set([z, K, g, t, i, h], 6), !this.isEmpty()) : (this.#i.set([z, K, g, t, i, h], 6), Math.abs(Math.atan2(K - t, z - g) - Math.atan2(_, O)) < Math.PI / 2 ? ([g, t, i, h] = this.#i.subarray(2, 6), this.#r.push(NaN, NaN, NaN, NaN, ((g + i) / 2 - d) / m, ((t + h) / 2 - c) / s), [g, t, z, K] = this.#i.subarray(14, 18), this.#e.push(NaN, NaN, NaN, NaN, ((z + g) / 2 - d) / m, ((K + t) / 2 - c) / s), !0) : ([z, K, g, t, i, h] = this.#i.subarray(0, 6), this.#r.push(((z + 5 * g) / 6 - d) / m, ((K + 5 * t) / 6 - c) / s, ((5 * g + i) / 6 - d) / m, ((5 * t + h) / 6 - c) / s, ((g + i) / 2 - d) / m, ((t + h) / 2 - c) / s), [i, h, g, t, z, K] = this.#i.subarray(12, 18), this.#e.push(((z + 5 * g) / 6 - d) / m, ((K + 5 * t) / 6 - c) / s, ((5 * g + i) / 6 - d) / m, ((5 * t + h) / 6 - c) / s, ((g + i) / 2 - d) / m, ((t + h) / 2 - c) / s), !0));
        }
        toSVGPath() {
          if (this.isEmpty())
            return "";
          const A = this.#r, r = this.#e, d = this.#i.subarray(4, 6), c = this.#i.subarray(16, 18), [m, s, g, t] = this.#t, [i, h, f, w] = this.#A();
          if (isNaN(this.#i[6]) && !this.isEmpty())
            return `M${(this.#i[2] - m) / g} ${(this.#i[3] - s) / t} L${(this.#i[4] - m) / g} ${(this.#i[5] - s) / t} L${i} ${h} L${f} ${w} L${(this.#i[16] - m) / g} ${(this.#i[17] - s) / t} L${(this.#i[14] - m) / g} ${(this.#i[15] - s) / t} Z`;
          const S = [];
          S.push(`M${A[4]} ${A[5]}`);
          for (let P = 6; P < A.length; P += 6)
            isNaN(A[P]) ? S.push(`L${A[P + 4]} ${A[P + 5]}`) : S.push(`C${A[P]} ${A[P + 1]} ${A[P + 2]} ${A[P + 3]} ${A[P + 4]} ${A[P + 5]}`);
          S.push(`L${(d[0] - m) / g} ${(d[1] - s) / t} L${i} ${h} L${f} ${w} L${(c[0] - m) / g} ${(c[1] - s) / t}`);
          for (let P = r.length - 6; P >= 6; P -= 6)
            isNaN(r[P]) ? S.push(`L${r[P + 4]} ${r[P + 5]}`) : S.push(`C${r[P]} ${r[P + 1]} ${r[P + 2]} ${r[P + 3]} ${r[P + 4]} ${r[P + 5]}`);
          return S.push(`L${r[4]} ${r[5]} Z`), S.join(" ");
        }
        getOutlines() {
          const A = this.#r, r = this.#e, d = this.#i, c = d.subarray(4, 6), m = d.subarray(16, 18), [s, g, t, i] = this.#t, h = new Float64Array((this.#o?.length ?? 0) + 2);
          for (let _ = 0, z = h.length - 2; _ < z; _ += 2)
            h[_] = (this.#o[_] - s) / t, h[_ + 1] = (this.#o[_ + 1] - g) / i;
          h[h.length - 2] = (this.#a - s) / t, h[h.length - 1] = (this.#l - g) / i;
          const [f, w, S, P] = this.#A();
          if (isNaN(d[6]) && !this.isEmpty()) {
            const _ = new Float64Array(36);
            return _.set([NaN, NaN, NaN, NaN, (d[2] - s) / t, (d[3] - g) / i, NaN, NaN, NaN, NaN, (d[4] - s) / t, (d[5] - g) / i, NaN, NaN, NaN, NaN, f, w, NaN, NaN, NaN, NaN, S, P, NaN, NaN, NaN, NaN, (d[16] - s) / t, (d[17] - g) / i, NaN, NaN, NaN, NaN, (d[14] - s) / t, (d[15] - g) / i], 0), new C(_, h, this.#t, this.#u, this.#s, this.#n);
          }
          const M = new Float64Array(this.#r.length + 24 + this.#e.length);
          let O = A.length;
          for (let _ = 0; _ < O; _ += 2) {
            if (isNaN(A[_])) {
              M[_] = M[_ + 1] = NaN;
              continue;
            }
            M[_] = A[_], M[_ + 1] = A[_ + 1];
          }
          M.set([NaN, NaN, NaN, NaN, (c[0] - s) / t, (c[1] - g) / i, NaN, NaN, NaN, NaN, f, w, NaN, NaN, NaN, NaN, S, P, NaN, NaN, NaN, NaN, (m[0] - s) / t, (m[1] - g) / i], O), O += 24;
          for (let _ = r.length - 6; _ >= 6; _ -= 6)
            for (let z = 0; z < 6; z += 2) {
              if (isNaN(r[_ + z])) {
                M[O] = M[O + 1] = NaN, O += 2;
                continue;
              }
              M[O] = r[_ + z], M[O + 1] = r[_ + z + 1], O += 2;
            }
          return M.set([NaN, NaN, NaN, NaN, r[4], r[5]], O), new C(M, h, this.#t, this.#u, this.#s, this.#n);
        }
      }
      class C extends N {
        #t;
        #e = null;
        #s;
        #n;
        #r;
        #i;
        #a;
        constructor(A, r, d, c, m, s) {
          super(), this.#a = A, this.#r = r, this.#t = d, this.#i = c, this.#s = m, this.#n = s, this.#d(s);
          const {
            x: g,
            y: t,
            width: i,
            height: h
          } = this.#e;
          for (let f = 0, w = A.length; f < w; f += 2)
            A[f] = (A[f] - g) / i, A[f + 1] = (A[f + 1] - t) / h;
          for (let f = 0, w = r.length; f < w; f += 2)
            r[f] = (r[f] - g) / i, r[f + 1] = (r[f + 1] - t) / h;
        }
        toSVGPath() {
          const A = [`M${this.#a[4]} ${this.#a[5]}`];
          for (let r = 6, d = this.#a.length; r < d; r += 6) {
            if (isNaN(this.#a[r])) {
              A.push(`L${this.#a[r + 4]} ${this.#a[r + 5]}`);
              continue;
            }
            A.push(`C${this.#a[r]} ${this.#a[r + 1]} ${this.#a[r + 2]} ${this.#a[r + 3]} ${this.#a[r + 4]} ${this.#a[r + 5]}`);
          }
          return A.push("Z"), A.join(" ");
        }
        serialize([A, r, d, c], m) {
          const s = d - A, g = c - r;
          let t, i;
          switch (m) {
            case 0:
              t = this.#l(this.#a, A, c, s, -g), i = this.#l(this.#r, A, c, s, -g);
              break;
            case 90:
              t = this.#h(this.#a, A, r, s, g), i = this.#h(this.#r, A, r, s, g);
              break;
            case 180:
              t = this.#l(this.#a, d, r, -s, g), i = this.#l(this.#r, d, r, -s, g);
              break;
            case 270:
              t = this.#h(this.#a, d, c, -s, -g), i = this.#h(this.#r, d, c, -s, -g);
              break;
          }
          return {
            outline: Array.from(t),
            points: [Array.from(i)]
          };
        }
        #l(A, r, d, c, m) {
          const s = new Float64Array(A.length);
          for (let g = 0, t = A.length; g < t; g += 2)
            s[g] = r + A[g] * c, s[g + 1] = d + A[g + 1] * m;
          return s;
        }
        #h(A, r, d, c, m) {
          const s = new Float64Array(A.length);
          for (let g = 0, t = A.length; g < t; g += 2)
            s[g] = r + A[g + 1] * c, s[g + 1] = d + A[g] * m;
          return s;
        }
        #d(A) {
          const r = this.#a;
          let d = r[4], c = r[5], m = d, s = c, g = d, t = c, i = d, h = c;
          const f = A ? Math.max : Math.min;
          for (let O = 6, _ = r.length; O < _; O += 6) {
            if (isNaN(r[O]))
              m = Math.min(m, r[O + 4]), s = Math.min(s, r[O + 5]), g = Math.max(g, r[O + 4]), t = Math.max(t, r[O + 5]), h < r[O + 5] ? (i = r[O + 4], h = r[O + 5]) : h === r[O + 5] && (i = f(i, r[O + 4]));
            else {
              const z = y.Util.bezierBoundingBox(d, c, ...r.slice(O, O + 6));
              m = Math.min(m, z[0]), s = Math.min(s, z[1]), g = Math.max(g, z[2]), t = Math.max(t, z[3]), h < z[3] ? (i = z[2], h = z[3]) : h === z[3] && (i = f(i, z[2]));
            }
            d = r[O + 4], c = r[O + 5];
          }
          const w = m - this.#s, S = s - this.#s, P = g - m + 2 * this.#s, M = t - s + 2 * this.#s;
          this.#e = {
            x: w,
            y: S,
            width: P,
            height: M,
            lastPoint: [i, h]
          };
        }
        get box() {
          return this.#e;
        }
        getNewOutline(A, r) {
          const {
            x: d,
            y: c,
            width: m,
            height: s
          } = this.#e, [g, t, i, h] = this.#t, f = m * i, w = s * h, S = d * i + g, P = c * h + t, M = new L({
            x: this.#r[0] * f + S,
            y: this.#r[1] * w + P
          }, this.#t, this.#i, A, this.#n, r ?? this.#s);
          for (let O = 2; O < this.#r.length; O += 2)
            M.add({
              x: this.#r[O] * f + S,
              y: this.#r[O + 1] * w + P
            });
          return M.getOutlines();
        }
      }
    }
  ),
  /***/
  362: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        EditorToolbar: () => (
          /* binding */
          B
        ),
        /* harmony export */
        HighlightToolbar: () => (
          /* binding */
          N
        )
        /* harmony export */
      });
      var y = V(419);
      class B {
        #t = null;
        #e = null;
        #s;
        #n = null;
        constructor(L) {
          this.#s = L;
        }
        render() {
          const L = this.#t = document.createElement("div");
          L.className = "editToolbar", L.setAttribute("role", "toolbar"), L.addEventListener("contextmenu", y.noContextMenu), L.addEventListener("pointerdown", B.#r);
          const C = this.#n = document.createElement("div");
          C.className = "buttons", L.append(C);
          const x = this.#s.toolbarPosition;
          if (x) {
            const {
              style: A
            } = L, r = this.#s._uiManager.direction === "ltr" ? 1 - x[0] : x[0];
            A.insetInlineEnd = `${100 * r}%`, A.top = `calc(${100 * x[1]}% + var(--editor-toolbar-vert-offset))`;
          }
          return this.#h(), L;
        }
        static #r(L) {
          L.stopPropagation();
        }
        #i(L) {
          this.#s._focusEventsAllowed = !1, L.preventDefault(), L.stopPropagation();
        }
        #a(L) {
          this.#s._focusEventsAllowed = !0, L.preventDefault(), L.stopPropagation();
        }
        #l(L) {
          L.addEventListener("focusin", this.#i.bind(this), {
            capture: !0
          }), L.addEventListener("focusout", this.#a.bind(this), {
            capture: !0
          }), L.addEventListener("contextmenu", y.noContextMenu);
        }
        hide() {
          this.#t.classList.add("hidden"), this.#e?.hideDropdown();
        }
        show() {
          this.#t.classList.remove("hidden");
        }
        #h() {
          const L = document.createElement("button");
          L.className = "delete", L.tabIndex = 0, L.setAttribute("data-l10n-id", `pdfjs-editor-remove-${this.#s.editorType}-button`), this.#l(L), L.addEventListener("click", (C) => {
            this.#s._uiManager.delete();
          }), this.#n.append(L);
        }
        get #d() {
          const L = document.createElement("div");
          return L.className = "divider", L;
        }
        addAltTextButton(L) {
          this.#l(L), this.#n.prepend(L, this.#d);
        }
        addColorPicker(L) {
          this.#e = L;
          const C = L.renderButton();
          this.#l(C), this.#n.prepend(C, this.#d);
        }
        remove() {
          this.#t.remove(), this.#e?.destroy(), this.#e = null;
        }
      }
      class N {
        #t = null;
        #e = null;
        #s;
        constructor(L) {
          this.#s = L;
        }
        #n() {
          const L = this.#e = document.createElement("div");
          L.className = "editToolbar", L.setAttribute("role", "toolbar"), L.addEventListener("contextmenu", y.noContextMenu);
          const C = this.#t = document.createElement("div");
          return C.className = "buttons", L.append(C), this.#i(), L;
        }
        #r(L, C) {
          let x = 0, A = 0;
          for (const r of L) {
            const d = r.y + r.height;
            if (d < x)
              continue;
            const c = r.x + (C ? r.width : 0);
            if (d > x) {
              A = c, x = d;
              continue;
            }
            C ? c > A && (A = c) : c < A && (A = c);
          }
          return [C ? 1 - A : A, x];
        }
        show(L, C, x) {
          const [A, r] = this.#r(C, x), {
            style: d
          } = this.#e ||= this.#n();
          L.append(this.#e), d.insetInlineEnd = `${100 * A}%`, d.top = `calc(${100 * r}% + var(--editor-toolbar-vert-offset))`;
        }
        hide() {
          this.#e.remove();
        }
        #i() {
          const L = document.createElement("button");
          L.className = "highlightButton", L.tabIndex = 0, L.setAttribute("data-l10n-id", "pdfjs-highlight-floating-button1");
          const C = document.createElement("span");
          L.append(C), C.className = "visuallyHidden", C.setAttribute("data-l10n-id", "pdfjs-highlight-floating-button-label"), L.addEventListener("contextmenu", y.noContextMenu), L.addEventListener("click", () => {
            this.#s.highlightSelection("floating_button");
          }), this.#t.append(L);
        }
      }
    }
  ),
  /***/
  830: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        AnnotationEditorUIManager: () => (
          /* binding */
          c
        ),
        /* harmony export */
        ColorManager: () => (
          /* binding */
          d
        ),
        /* harmony export */
        KeyboardManager: () => (
          /* binding */
          r
        ),
        /* harmony export */
        bindEvents: () => (
          /* binding */
          U
        ),
        /* harmony export */
        opacityToHex: () => (
          /* binding */
          L
        )
        /* harmony export */
      });
      var y = V(292), B = V(419), N = V(362);
      function U(m, s, g) {
        for (const t of g)
          s.addEventListener(t, m[t].bind(m));
      }
      function L(m) {
        return Math.round(Math.min(255, Math.max(1, 255 * m))).toString(16).padStart(2, "0");
      }
      class C {
        #t = 0;
        constructor() {
        }
        get id() {
          return `${y.AnnotationEditorPrefix}${this.#t++}`;
        }
      }
      class x {
        #t = (0, y.getUuid)();
        #e = 0;
        #s = null;
        static get _isSVGFittingCanvas() {
          const s = 'data:image/svg+xml;charset=UTF-8,<svg viewBox="0 0 1 1" width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" style="fill:red;"/></svg>', t = new OffscreenCanvas(1, 3).getContext("2d"), i = new Image();
          i.src = s;
          const h = i.decode().then(() => (t.drawImage(i, 0, 0, 1, 1, 0, 0, 1, 3), new Uint32Array(t.getImageData(0, 0, 1, 1).data.buffer)[0] === 0));
          return (0, y.shadow)(this, "_isSVGFittingCanvas", h);
        }
        async #n(s, g) {
          this.#s ||= /* @__PURE__ */ new Map();
          let t = this.#s.get(s);
          if (t === null)
            return null;
          if (t?.bitmap)
            return t.refCounter += 1, t;
          try {
            t ||= {
              bitmap: null,
              id: `image_${this.#t}_${this.#e++}`,
              refCounter: 0,
              isSvg: !1
            };
            let i;
            if (typeof g == "string" ? (t.url = g, i = await (0, B.fetchData)(g, "blob")) : i = t.file = g, i.type === "image/svg+xml") {
              const h = x._isSVGFittingCanvas, f = new FileReader(), w = new Image(), S = new Promise((P, M) => {
                w.onload = () => {
                  t.bitmap = w, t.isSvg = !0, P();
                }, f.onload = async () => {
                  const O = t.svgUrl = f.result;
                  w.src = await h ? `${O}#svgView(preserveAspectRatio(none))` : O;
                }, w.onerror = f.onerror = M;
              });
              f.readAsDataURL(i), await S;
            } else
              t.bitmap = await createImageBitmap(i);
            t.refCounter = 1;
          } catch (i) {
            console.error(i), t = null;
          }
          return this.#s.set(s, t), t && this.#s.set(t.id, t), t;
        }
        async getFromFile(s) {
          const {
            lastModified: g,
            name: t,
            size: i,
            type: h
          } = s;
          return this.#n(`${g}_${t}_${i}_${h}`, s);
        }
        async getFromUrl(s) {
          return this.#n(s, s);
        }
        async getFromId(s) {
          this.#s ||= /* @__PURE__ */ new Map();
          const g = this.#s.get(s);
          return g ? g.bitmap ? (g.refCounter += 1, g) : g.file ? this.getFromFile(g.file) : this.getFromUrl(g.url) : null;
        }
        getSvgUrl(s) {
          const g = this.#s.get(s);
          return g?.isSvg ? g.svgUrl : null;
        }
        deleteId(s) {
          this.#s ||= /* @__PURE__ */ new Map();
          const g = this.#s.get(s);
          g && (g.refCounter -= 1, g.refCounter === 0 && (g.bitmap = null));
        }
        isValidId(s) {
          return s.startsWith(`image_${this.#t}_`);
        }
      }
      class A {
        #t = [];
        #e = !1;
        #s;
        #n = -1;
        constructor(s = 128) {
          this.#s = s;
        }
        add({
          cmd: s,
          undo: g,
          post: t,
          mustExec: i,
          type: h = NaN,
          overwriteIfSameType: f = !1,
          keepUndo: w = !1
        }) {
          if (i && s(), this.#e)
            return;
          const S = {
            cmd: s,
            undo: g,
            post: t,
            type: h
          };
          if (this.#n === -1) {
            this.#t.length > 0 && (this.#t.length = 0), this.#n = 0, this.#t.push(S);
            return;
          }
          if (f && this.#t[this.#n].type === h) {
            w && (S.undo = this.#t[this.#n].undo), this.#t[this.#n] = S;
            return;
          }
          const P = this.#n + 1;
          P === this.#s ? this.#t.splice(0, 1) : (this.#n = P, P < this.#t.length && this.#t.splice(P)), this.#t.push(S);
        }
        undo() {
          if (this.#n === -1)
            return;
          this.#e = !0;
          const {
            undo: s,
            post: g
          } = this.#t[this.#n];
          s(), g?.(), this.#e = !1, this.#n -= 1;
        }
        redo() {
          if (this.#n < this.#t.length - 1) {
            this.#n += 1, this.#e = !0;
            const {
              cmd: s,
              post: g
            } = this.#t[this.#n];
            s(), g?.(), this.#e = !1;
          }
        }
        hasSomethingToUndo() {
          return this.#n !== -1;
        }
        hasSomethingToRedo() {
          return this.#n < this.#t.length - 1;
        }
        destroy() {
          this.#t = null;
        }
      }
      class r {
        constructor(s) {
          this.buffer = [], this.callbacks = /* @__PURE__ */ new Map(), this.allKeys = /* @__PURE__ */ new Set();
          const {
            isMac: g
          } = y.FeatureTest.platform;
          for (const [t, i, h = {}] of s)
            for (const f of t) {
              const w = f.startsWith("mac+");
              g && w ? (this.callbacks.set(f.slice(4), {
                callback: i,
                options: h
              }), this.allKeys.add(f.split("+").at(-1))) : !g && !w && (this.callbacks.set(f, {
                callback: i,
                options: h
              }), this.allKeys.add(f.split("+").at(-1)));
            }
        }
        #t(s) {
          s.altKey && this.buffer.push("alt"), s.ctrlKey && this.buffer.push("ctrl"), s.metaKey && this.buffer.push("meta"), s.shiftKey && this.buffer.push("shift"), this.buffer.push(s.key);
          const g = this.buffer.join("+");
          return this.buffer.length = 0, g;
        }
        exec(s, g) {
          if (!this.allKeys.has(g.key))
            return;
          const t = this.callbacks.get(this.#t(g));
          if (!t)
            return;
          const {
            callback: i,
            options: {
              bubbles: h = !1,
              args: f = [],
              checker: w = null
            }
          } = t;
          w && !w(s, g) || (i.bind(s, ...f, g)(), h || (g.stopPropagation(), g.preventDefault()));
        }
      }
      class d {
        static _colorsMapping = /* @__PURE__ */ new Map([["CanvasText", [0, 0, 0]], ["Canvas", [255, 255, 255]]]);
        get _colors() {
          const s = /* @__PURE__ */ new Map([["CanvasText", null], ["Canvas", null]]);
          return (0, B.getColorValues)(s), (0, y.shadow)(this, "_colors", s);
        }
        convert(s) {
          const g = (0, B.getRGB)(s);
          if (!window.matchMedia("(forced-colors: active)").matches)
            return g;
          for (const [t, i] of this._colors)
            if (i.every((h, f) => h === g[f]))
              return d._colorsMapping.get(t);
          return g;
        }
        getHexCode(s) {
          const g = this._colors.get(s);
          return g ? y.Util.makeHexColor(...g) : s;
        }
      }
      class c {
        #t = null;
        #e = /* @__PURE__ */ new Map();
        #s = /* @__PURE__ */ new Map();
        #n = null;
        #r = null;
        #i = null;
        #a = new A();
        #l = 0;
        #h = /* @__PURE__ */ new Set();
        #d = null;
        #u = null;
        #c = /* @__PURE__ */ new Set();
        #o = !1;
        #p = null;
        #g = null;
        #f = null;
        #A = !1;
        #m = null;
        #v = new C();
        #w = !1;
        #C = !1;
        #R = null;
        #I = null;
        #P = null;
        #y = y.AnnotationEditorType.NONE;
        #b = /* @__PURE__ */ new Set();
        #S = null;
        #E = null;
        #k = null;
        #T = this.blur.bind(this);
        #M = this.focus.bind(this);
        #F = this.copy.bind(this);
        #N = this.cut.bind(this);
        #L = this.paste.bind(this);
        #D = this.keydown.bind(this);
        #G = this.keyup.bind(this);
        #X = this.onEditingAction.bind(this);
        #$ = this.onPageChanging.bind(this);
        #V = this.onScaleChanging.bind(this);
        #B = this.#rt.bind(this);
        #O = this.onRotationChanging.bind(this);
        #q = {
          isEditing: !1,
          isEmpty: !0,
          hasSomethingToUndo: !1,
          hasSomethingToRedo: !1,
          hasSelectedEditor: !1,
          hasSelectedText: !1
        };
        #U = [0, 0];
        #_ = null;
        #z = null;
        #K = null;
        static TRANSLATE_SMALL = 1;
        static TRANSLATE_BIG = 10;
        static get _keyboardManager() {
          const s = c.prototype, g = (f) => f.#z.contains(document.activeElement) && document.activeElement.tagName !== "BUTTON" && f.hasSomethingToControl(), t = (f, {
            target: w
          }) => {
            if (w instanceof HTMLInputElement) {
              const {
                type: S
              } = w;
              return S !== "text" && S !== "number";
            }
            return !0;
          }, i = this.TRANSLATE_SMALL, h = this.TRANSLATE_BIG;
          return (0, y.shadow)(this, "_keyboardManager", new r([[["ctrl+a", "mac+meta+a"], s.selectAll, {
            checker: t
          }], [["ctrl+z", "mac+meta+z"], s.undo, {
            checker: t
          }], [["ctrl+y", "ctrl+shift+z", "mac+meta+shift+z", "ctrl+shift+Z", "mac+meta+shift+Z"], s.redo, {
            checker: t
          }], [["Backspace", "alt+Backspace", "ctrl+Backspace", "shift+Backspace", "mac+Backspace", "mac+alt+Backspace", "mac+ctrl+Backspace", "Delete", "ctrl+Delete", "shift+Delete", "mac+Delete"], s.delete, {
            checker: t
          }], [["Enter", "mac+Enter"], s.addNewEditorFromKeyboard, {
            checker: (f, {
              target: w
            }) => !(w instanceof HTMLButtonElement) && f.#z.contains(w) && !f.isEnterHandled
          }], [[" ", "mac+ "], s.addNewEditorFromKeyboard, {
            checker: (f, {
              target: w
            }) => !(w instanceof HTMLButtonElement) && f.#z.contains(document.activeElement)
          }], [["Escape", "mac+Escape"], s.unselectAll], [["ArrowLeft", "mac+ArrowLeft"], s.translateSelectedEditors, {
            args: [-i, 0],
            checker: g
          }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], s.translateSelectedEditors, {
            args: [-h, 0],
            checker: g
          }], [["ArrowRight", "mac+ArrowRight"], s.translateSelectedEditors, {
            args: [i, 0],
            checker: g
          }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], s.translateSelectedEditors, {
            args: [h, 0],
            checker: g
          }], [["ArrowUp", "mac+ArrowUp"], s.translateSelectedEditors, {
            args: [0, -i],
            checker: g
          }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], s.translateSelectedEditors, {
            args: [0, -h],
            checker: g
          }], [["ArrowDown", "mac+ArrowDown"], s.translateSelectedEditors, {
            args: [0, i],
            checker: g
          }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], s.translateSelectedEditors, {
            args: [0, h],
            checker: g
          }]]));
        }
        constructor(s, g, t, i, h, f, w, S, P) {
          this.#z = s, this.#K = g, this.#n = t, this._eventBus = i, this._eventBus._on("editingaction", this.#X), this._eventBus._on("pagechanging", this.#$), this._eventBus._on("scalechanging", this.#V), this._eventBus._on("rotationchanging", this.#O), this.#at(), this.#J(), this.#r = h.annotationStorage, this.#p = h.filterFactory, this.#E = f, this.#f = w || null, this.#o = S, this.#P = P || null, this.viewParameters = {
            realScale: B.PixelsPerInch.PDF_TO_CSS_UNITS,
            rotation: 0
          }, this.isShiftKeyDown = !1;
        }
        destroy() {
          this.#Z(), this.#Q(), this._eventBus._off("editingaction", this.#X), this._eventBus._off("pagechanging", this.#$), this._eventBus._off("scalechanging", this.#V), this._eventBus._off("rotationchanging", this.#O);
          for (const s of this.#s.values())
            s.destroy();
          this.#s.clear(), this.#e.clear(), this.#c.clear(), this.#t = null, this.#b.clear(), this.#a.destroy(), this.#n?.destroy(), this.#m?.hide(), this.#m = null, this.#g && (clearTimeout(this.#g), this.#g = null), this.#_ && (clearTimeout(this.#_), this.#_ = null), this.#ot();
        }
        async mlGuess(s) {
          return this.#P?.guess(s) || null;
        }
        get hasMLManager() {
          return !!this.#P;
        }
        get hcmFilter() {
          return (0, y.shadow)(this, "hcmFilter", this.#E ? this.#p.addHCMFilter(this.#E.foreground, this.#E.background) : "none");
        }
        get direction() {
          return (0, y.shadow)(this, "direction", getComputedStyle(this.#z).direction);
        }
        get highlightColors() {
          return (0, y.shadow)(this, "highlightColors", this.#f ? new Map(this.#f.split(",").map((s) => s.split("=").map((g) => g.trim()))) : null);
        }
        get highlightColorNames() {
          return (0, y.shadow)(this, "highlightColorNames", this.highlightColors ? new Map(Array.from(this.highlightColors, (s) => s.reverse())) : null);
        }
        setMainHighlightColorPicker(s) {
          this.#I = s;
        }
        editAltText(s) {
          this.#n?.editAltText(this, s);
        }
        onPageChanging({
          pageNumber: s
        }) {
          this.#l = s - 1;
        }
        focusMainContainer() {
          this.#z.focus();
        }
        findParent(s, g) {
          for (const t of this.#s.values()) {
            const {
              x: i,
              y: h,
              width: f,
              height: w
            } = t.div.getBoundingClientRect();
            if (s >= i && s <= i + f && g >= h && g <= h + w)
              return t;
          }
          return null;
        }
        disableUserSelect(s = !1) {
          this.#K.classList.toggle("noUserSelect", s);
        }
        addShouldRescale(s) {
          this.#c.add(s);
        }
        removeShouldRescale(s) {
          this.#c.delete(s);
        }
        onScaleChanging({
          scale: s
        }) {
          this.commitOrRemove(), this.viewParameters.realScale = s * B.PixelsPerInch.PDF_TO_CSS_UNITS;
          for (const g of this.#c)
            g.onScaleChanging();
        }
        onRotationChanging({
          pagesRotation: s
        }) {
          this.commitOrRemove(), this.viewParameters.rotation = s;
        }
        #Y({
          anchorNode: s
        }) {
          return s.nodeType === Node.TEXT_NODE ? s.parentElement : s;
        }
        highlightSelection(s = "") {
          const g = document.getSelection();
          if (!g || g.isCollapsed)
            return;
          const {
            anchorNode: t,
            anchorOffset: i,
            focusNode: h,
            focusOffset: f
          } = g, w = g.toString(), P = this.#Y(g).closest(".textLayer"), M = this.getSelectionBoxes(P);
          if (M) {
            g.empty(), this.#y === y.AnnotationEditorType.NONE && (this._eventBus.dispatch("showannotationeditorui", {
              source: this,
              mode: y.AnnotationEditorType.HIGHLIGHT
            }), this.showAllEditors("highlight", !0, !0));
            for (const O of this.#s.values())
              if (O.hasTextLayer(P)) {
                O.createAndAddNewEditor({
                  x: 0,
                  y: 0
                }, !1, {
                  methodOfCreation: s,
                  boxes: M,
                  anchorNode: t,
                  anchorOffset: i,
                  focusNode: h,
                  focusOffset: f,
                  text: w
                });
                break;
              }
          }
        }
        #nt() {
          const s = document.getSelection();
          if (!s || s.isCollapsed)
            return;
          const t = this.#Y(s).closest(".textLayer"), i = this.getSelectionBoxes(t);
          i && (this.#m ||= new N.HighlightToolbar(this), this.#m.show(t, i, this.direction === "ltr"));
        }
        addToAnnotationStorage(s) {
          !s.isEmpty() && this.#r && !this.#r.has(s.id) && this.#r.setValue(s.id, s);
        }
        #rt() {
          const s = document.getSelection();
          if (!s || s.isCollapsed) {
            this.#S && (this.#m?.hide(), this.#S = null, this.#x({
              hasSelectedText: !1
            }));
            return;
          }
          const {
            anchorNode: g
          } = s;
          if (g === this.#S)
            return;
          if (!this.#Y(s).closest(".textLayer")) {
            this.#S && (this.#m?.hide(), this.#S = null, this.#x({
              hasSelectedText: !1
            }));
            return;
          }
          if (this.#m?.hide(), this.#S = g, this.#x({
            hasSelectedText: !0
          }), !(this.#y !== y.AnnotationEditorType.HIGHLIGHT && this.#y !== y.AnnotationEditorType.NONE) && (this.#y === y.AnnotationEditorType.HIGHLIGHT && this.showAllEditors("highlight", !0, !0), this.#A = this.isShiftKeyDown, !this.isShiftKeyDown)) {
            const h = (f) => {
              f.type === "pointerup" && f.button !== 0 || (window.removeEventListener("pointerup", h), window.removeEventListener("blur", h), f.type === "pointerup" && this.#W("main_toolbar"));
            };
            window.addEventListener("pointerup", h), window.addEventListener("blur", h);
          }
        }
        #W(s = "") {
          this.#y === y.AnnotationEditorType.HIGHLIGHT ? this.highlightSelection(s) : this.#o && this.#nt();
        }
        #at() {
          document.addEventListener("selectionchange", this.#B);
        }
        #ot() {
          document.removeEventListener("selectionchange", this.#B);
        }
        #ht() {
          window.addEventListener("focus", this.#M), window.addEventListener("blur", this.#T);
        }
        #Q() {
          window.removeEventListener("focus", this.#M), window.removeEventListener("blur", this.#T);
        }
        blur() {
          if (this.isShiftKeyDown = !1, this.#A && (this.#A = !1, this.#W("main_toolbar")), !this.hasSelection)
            return;
          const {
            activeElement: s
          } = document;
          for (const g of this.#b)
            if (g.div.contains(s)) {
              this.#R = [g, s], g._focusEventsAllowed = !1;
              break;
            }
        }
        focus() {
          if (!this.#R)
            return;
          const [s, g] = this.#R;
          this.#R = null, g.addEventListener("focusin", () => {
            s._focusEventsAllowed = !0;
          }, {
            once: !0
          }), g.focus();
        }
        #J() {
          window.addEventListener("keydown", this.#D), window.addEventListener("keyup", this.#G);
        }
        #Z() {
          window.removeEventListener("keydown", this.#D), window.removeEventListener("keyup", this.#G);
        }
        #tt() {
          document.addEventListener("copy", this.#F), document.addEventListener("cut", this.#N), document.addEventListener("paste", this.#L);
        }
        #et() {
          document.removeEventListener("copy", this.#F), document.removeEventListener("cut", this.#N), document.removeEventListener("paste", this.#L);
        }
        addEditListeners() {
          this.#J(), this.#tt();
        }
        removeEditListeners() {
          this.#Z(), this.#et();
        }
        copy(s) {
          if (s.preventDefault(), this.#t?.commitOrRemove(), !this.hasSelection)
            return;
          const g = [];
          for (const t of this.#b) {
            const i = t.serialize(!0);
            i && g.push(i);
          }
          g.length !== 0 && s.clipboardData.setData("application/pdfjs", JSON.stringify(g));
        }
        cut(s) {
          this.copy(s), this.delete();
        }
        paste(s) {
          s.preventDefault();
          const {
            clipboardData: g
          } = s;
          for (const h of g.items)
            for (const f of this.#u)
              if (f.isHandlingMimeForPasting(h.type)) {
                f.paste(h, this.currentLayer);
                return;
              }
          let t = g.getData("application/pdfjs");
          if (!t)
            return;
          try {
            t = JSON.parse(t);
          } catch (h) {
            (0, y.warn)(`paste: "${h.message}".`);
            return;
          }
          if (!Array.isArray(t))
            return;
          this.unselectAll();
          const i = this.currentLayer;
          try {
            const h = [];
            for (const S of t) {
              const P = i.deserialize(S);
              if (!P)
                return;
              h.push(P);
            }
            const f = () => {
              for (const S of h)
                this.#st(S);
              this.#it(h);
            }, w = () => {
              for (const S of h)
                S.remove();
            };
            this.addCommands({
              cmd: f,
              undo: w,
              mustExec: !0
            });
          } catch (h) {
            (0, y.warn)(`paste: "${h.message}".`);
          }
        }
        keydown(s) {
          !this.isShiftKeyDown && s.key === "Shift" && (this.isShiftKeyDown = !0), this.#y !== y.AnnotationEditorType.NONE && !this.isEditorHandlingKeyboard && c._keyboardManager.exec(this, s);
        }
        keyup(s) {
          this.isShiftKeyDown && s.key === "Shift" && (this.isShiftKeyDown = !1, this.#A && (this.#A = !1, this.#W("main_toolbar")));
        }
        onEditingAction({
          name: s
        }) {
          switch (s) {
            case "undo":
            case "redo":
            case "delete":
            case "selectAll":
              this[s]();
              break;
            case "highlightSelection":
              this.highlightSelection("context_menu");
              break;
          }
        }
        #x(s) {
          Object.entries(s).some(([t, i]) => this.#q[t] !== i) && (this._eventBus.dispatch("annotationeditorstateschanged", {
            source: this,
            details: Object.assign(this.#q, s)
          }), this.#y === y.AnnotationEditorType.HIGHLIGHT && s.hasSelectedEditor === !1 && this.#H([[y.AnnotationEditorParamsType.HIGHLIGHT_FREE, !0]]));
        }
        #H(s) {
          this._eventBus.dispatch("annotationeditorparamschanged", {
            source: this,
            details: s
          });
        }
        setEditingState(s) {
          s ? (this.#ht(), this.#tt(), this.#x({
            isEditing: this.#y !== y.AnnotationEditorType.NONE,
            isEmpty: this.#j(),
            hasSomethingToUndo: this.#a.hasSomethingToUndo(),
            hasSomethingToRedo: this.#a.hasSomethingToRedo(),
            hasSelectedEditor: !1
          })) : (this.#Q(), this.#et(), this.#x({
            isEditing: !1
          }), this.disableUserSelect(!1));
        }
        registerEditorTypes(s) {
          if (!this.#u) {
            this.#u = s;
            for (const g of this.#u)
              this.#H(g.defaultPropertiesToUpdate);
          }
        }
        getId() {
          return this.#v.id;
        }
        get currentLayer() {
          return this.#s.get(this.#l);
        }
        getLayer(s) {
          return this.#s.get(s);
        }
        get currentPageIndex() {
          return this.#l;
        }
        addLayer(s) {
          this.#s.set(s.pageIndex, s), this.#w ? s.enable() : s.disable();
        }
        removeLayer(s) {
          this.#s.delete(s.pageIndex);
        }
        updateMode(s, g = null, t = !1) {
          if (this.#y !== s) {
            if (this.#y = s, s === y.AnnotationEditorType.NONE) {
              this.setEditingState(!1), this.#ct();
              return;
            }
            this.setEditingState(!0), this.#lt(), this.unselectAll();
            for (const i of this.#s.values())
              i.updateMode(s);
            if (!g && t) {
              this.addNewEditorFromKeyboard();
              return;
            }
            if (g) {
              for (const i of this.#e.values())
                if (i.annotationElementId === g) {
                  this.setSelected(i), i.enterInEditMode();
                  break;
                }
            }
          }
        }
        addNewEditorFromKeyboard() {
          this.currentLayer.canCreateNewEmptyEditor() && this.currentLayer.addNewEditor();
        }
        updateToolbar(s) {
          s !== this.#y && this._eventBus.dispatch("switchannotationeditormode", {
            source: this,
            mode: s
          });
        }
        updateParams(s, g) {
          if (this.#u) {
            switch (s) {
              case y.AnnotationEditorParamsType.CREATE:
                this.currentLayer.addNewEditor();
                return;
              case y.AnnotationEditorParamsType.HIGHLIGHT_DEFAULT_COLOR:
                this.#I?.updateColor(g);
                break;
              case y.AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL:
                this._eventBus.dispatch("reporttelemetry", {
                  source: this,
                  details: {
                    type: "editing",
                    data: {
                      type: "highlight",
                      action: "toggle_visibility"
                    }
                  }
                }), (this.#k ||= /* @__PURE__ */ new Map()).set(s, g), this.showAllEditors("highlight", g);
                break;
            }
            for (const t of this.#b)
              t.updateParams(s, g);
            for (const t of this.#u)
              t.updateDefaultParams(s, g);
          }
        }
        showAllEditors(s, g, t = !1) {
          for (const h of this.#e.values())
            h.editorType === s && h.show(g);
          (this.#k?.get(y.AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL) ?? !0) !== g && this.#H([[y.AnnotationEditorParamsType.HIGHLIGHT_SHOW_ALL, g]]);
        }
        enableWaiting(s = !1) {
          if (this.#C !== s) {
            this.#C = s;
            for (const g of this.#s.values())
              s ? g.disableClick() : g.enableClick(), g.div.classList.toggle("waiting", s);
          }
        }
        #lt() {
          if (!this.#w) {
            this.#w = !0;
            for (const s of this.#s.values())
              s.enable();
            for (const s of this.#e.values())
              s.enable();
          }
        }
        #ct() {
          if (this.unselectAll(), this.#w) {
            this.#w = !1;
            for (const s of this.#s.values())
              s.disable();
            for (const s of this.#e.values())
              s.disable();
          }
        }
        getEditors(s) {
          const g = [];
          for (const t of this.#e.values())
            t.pageIndex === s && g.push(t);
          return g;
        }
        getEditor(s) {
          return this.#e.get(s);
        }
        addEditor(s) {
          this.#e.set(s.id, s);
        }
        removeEditor(s) {
          s.div.contains(document.activeElement) && (this.#g && clearTimeout(this.#g), this.#g = setTimeout(() => {
            this.focusMainContainer(), this.#g = null;
          }, 0)), this.#e.delete(s.id), this.unselect(s), (!s.annotationElementId || !this.#h.has(s.annotationElementId)) && this.#r?.remove(s.id);
        }
        addDeletedAnnotationElement(s) {
          this.#h.add(s.annotationElementId), this.addChangedExistingAnnotation(s), s.deleted = !0;
        }
        isDeletedAnnotationElement(s) {
          return this.#h.has(s);
        }
        removeDeletedAnnotationElement(s) {
          this.#h.delete(s.annotationElementId), this.removeChangedExistingAnnotation(s), s.deleted = !1;
        }
        #st(s) {
          const g = this.#s.get(s.pageIndex);
          g ? g.addOrRebuild(s) : (this.addEditor(s), this.addToAnnotationStorage(s));
        }
        setActiveEditor(s) {
          this.#t !== s && (this.#t = s, s && this.#H(s.propertiesToUpdate));
        }
        get #dt() {
          let s = null;
          for (s of this.#b)
            ;
          return s;
        }
        updateUI(s) {
          this.#dt === s && this.#H(s.propertiesToUpdate);
        }
        toggleSelected(s) {
          if (this.#b.has(s)) {
            this.#b.delete(s), s.unselect(), this.#x({
              hasSelectedEditor: this.hasSelection
            });
            return;
          }
          this.#b.add(s), s.select(), this.#H(s.propertiesToUpdate), this.#x({
            hasSelectedEditor: !0
          });
        }
        setSelected(s) {
          for (const g of this.#b)
            g !== s && g.unselect();
          this.#b.clear(), this.#b.add(s), s.select(), this.#H(s.propertiesToUpdate), this.#x({
            hasSelectedEditor: !0
          });
        }
        isSelected(s) {
          return this.#b.has(s);
        }
        get firstSelectedEditor() {
          return this.#b.values().next().value;
        }
        unselect(s) {
          s.unselect(), this.#b.delete(s), this.#x({
            hasSelectedEditor: this.hasSelection
          });
        }
        get hasSelection() {
          return this.#b.size !== 0;
        }
        get isEnterHandled() {
          return this.#b.size === 1 && this.firstSelectedEditor.isEnterHandled;
        }
        undo() {
          this.#a.undo(), this.#x({
            hasSomethingToUndo: this.#a.hasSomethingToUndo(),
            hasSomethingToRedo: !0,
            isEmpty: this.#j()
          });
        }
        redo() {
          this.#a.redo(), this.#x({
            hasSomethingToUndo: !0,
            hasSomethingToRedo: this.#a.hasSomethingToRedo(),
            isEmpty: this.#j()
          });
        }
        addCommands(s) {
          this.#a.add(s), this.#x({
            hasSomethingToUndo: !0,
            hasSomethingToRedo: !1,
            isEmpty: this.#j()
          });
        }
        #j() {
          if (this.#e.size === 0)
            return !0;
          if (this.#e.size === 1)
            for (const s of this.#e.values())
              return s.isEmpty();
          return !1;
        }
        delete() {
          if (this.commitOrRemove(), !this.hasSelection)
            return;
          const s = [...this.#b], g = () => {
            for (const i of s)
              i.remove();
          }, t = () => {
            for (const i of s)
              this.#st(i);
          };
          this.addCommands({
            cmd: g,
            undo: t,
            mustExec: !0
          });
        }
        commitOrRemove() {
          this.#t?.commitOrRemove();
        }
        hasSomethingToControl() {
          return this.#t || this.hasSelection;
        }
        #it(s) {
          for (const g of this.#b)
            g.unselect();
          this.#b.clear();
          for (const g of s)
            g.isEmpty() || (this.#b.add(g), g.select());
          this.#x({
            hasSelectedEditor: this.hasSelection
          });
        }
        selectAll() {
          for (const s of this.#b)
            s.commit();
          this.#it(this.#e.values());
        }
        unselectAll() {
          if (!(this.#t && (this.#t.commitOrRemove(), this.#y !== y.AnnotationEditorType.NONE)) && this.hasSelection) {
            for (const s of this.#b)
              s.unselect();
            this.#b.clear(), this.#x({
              hasSelectedEditor: !1
            });
          }
        }
        translateSelectedEditors(s, g, t = !1) {
          if (t || this.commitOrRemove(), !this.hasSelection)
            return;
          this.#U[0] += s, this.#U[1] += g;
          const [i, h] = this.#U, f = [...this.#b], w = 1e3;
          this.#_ && clearTimeout(this.#_), this.#_ = setTimeout(() => {
            this.#_ = null, this.#U[0] = this.#U[1] = 0, this.addCommands({
              cmd: () => {
                for (const S of f)
                  this.#e.has(S.id) && S.translateInPage(i, h);
              },
              undo: () => {
                for (const S of f)
                  this.#e.has(S.id) && S.translateInPage(-i, -h);
              },
              mustExec: !1
            });
          }, w);
          for (const S of f)
            S.translateInPage(s, g);
        }
        setUpDragSession() {
          if (this.hasSelection) {
            this.disableUserSelect(!0), this.#d = /* @__PURE__ */ new Map();
            for (const s of this.#b)
              this.#d.set(s, {
                savedX: s.x,
                savedY: s.y,
                savedPageIndex: s.pageIndex,
                newX: 0,
                newY: 0,
                newPageIndex: -1
              });
          }
        }
        endDragSession() {
          if (!this.#d)
            return !1;
          this.disableUserSelect(!1);
          const s = this.#d;
          this.#d = null;
          let g = !1;
          for (const [{
            x: i,
            y: h,
            pageIndex: f
          }, w] of s)
            w.newX = i, w.newY = h, w.newPageIndex = f, g ||= i !== w.savedX || h !== w.savedY || f !== w.savedPageIndex;
          if (!g)
            return !1;
          const t = (i, h, f, w) => {
            if (this.#e.has(i.id)) {
              const S = this.#s.get(w);
              S ? i._setParentAndPosition(S, h, f) : (i.pageIndex = w, i.x = h, i.y = f);
            }
          };
          return this.addCommands({
            cmd: () => {
              for (const [i, {
                newX: h,
                newY: f,
                newPageIndex: w
              }] of s)
                t(i, h, f, w);
            },
            undo: () => {
              for (const [i, {
                savedX: h,
                savedY: f,
                savedPageIndex: w
              }] of s)
                t(i, h, f, w);
            },
            mustExec: !0
          }), !0;
        }
        dragSelectedEditors(s, g) {
          if (this.#d)
            for (const t of this.#d.keys())
              t.drag(s, g);
        }
        rebuild(s) {
          if (s.parent === null) {
            const g = this.getLayer(s.pageIndex);
            g ? (g.changeParent(s), g.addOrRebuild(s)) : (this.addEditor(s), this.addToAnnotationStorage(s), s.rebuild());
          } else
            s.parent.addOrRebuild(s);
        }
        get isEditorHandlingKeyboard() {
          return this.getActive()?.shouldGetKeyboardEvents() || this.#b.size === 1 && this.firstSelectedEditor.shouldGetKeyboardEvents();
        }
        isActive(s) {
          return this.#t === s;
        }
        getActive() {
          return this.#t;
        }
        getMode() {
          return this.#y;
        }
        get imageManager() {
          return (0, y.shadow)(this, "imageManager", new x());
        }
        getSelectionBoxes(s) {
          if (!s)
            return null;
          const g = document.getSelection();
          for (let P = 0, M = g.rangeCount; P < M; P++)
            if (!s.contains(g.getRangeAt(P).commonAncestorContainer))
              return null;
          const {
            x: t,
            y: i,
            width: h,
            height: f
          } = s.getBoundingClientRect();
          let w;
          switch (s.getAttribute("data-main-rotation")) {
            case "90":
              w = (P, M, O, _) => ({
                x: (M - i) / f,
                y: 1 - (P + O - t) / h,
                width: _ / f,
                height: O / h
              });
              break;
            case "180":
              w = (P, M, O, _) => ({
                x: 1 - (P + O - t) / h,
                y: 1 - (M + _ - i) / f,
                width: O / h,
                height: _ / f
              });
              break;
            case "270":
              w = (P, M, O, _) => ({
                x: 1 - (M + _ - i) / f,
                y: (P - t) / h,
                width: _ / f,
                height: O / h
              });
              break;
            default:
              w = (P, M, O, _) => ({
                x: (P - t) / h,
                y: (M - i) / f,
                width: O / h,
                height: _ / f
              });
              break;
          }
          const S = [];
          for (let P = 0, M = g.rangeCount; P < M; P++) {
            const O = g.getRangeAt(P);
            if (!O.collapsed)
              for (const {
                x: _,
                y: z,
                width: K,
                height: nt
              } of O.getClientRects())
                K === 0 || nt === 0 || S.push(w(_, z, K, nt));
          }
          return S.length === 0 ? null : S;
        }
        addChangedExistingAnnotation({
          annotationElementId: s,
          id: g
        }) {
          (this.#i ||= /* @__PURE__ */ new Map()).set(s, g);
        }
        removeChangedExistingAnnotation({
          annotationElementId: s
        }) {
          this.#i?.delete(s);
        }
        renderAnnotationElement(s) {
          const g = this.#i?.get(s.data.id);
          if (!g)
            return;
          const t = this.#r.getRawValue(g);
          t && (this.#y === y.AnnotationEditorType.NONE && !t.hasBeenModified || t.renderAnnotationElement(s));
        }
      }
    }
  ),
  /***/
  94: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        PDFFetchStream: () => (
          /* binding */
          C
        )
        /* harmony export */
      });
      var y = V(292), B = V(490);
      function N(r, d, c) {
        return {
          method: "GET",
          headers: r,
          signal: c.signal,
          mode: "cors",
          credentials: d ? "include" : "same-origin",
          redirect: "follow"
        };
      }
      function U(r) {
        const d = new Headers();
        for (const c in r) {
          const m = r[c];
          m !== void 0 && d.append(c, m);
        }
        return d;
      }
      function L(r) {
        return r instanceof Uint8Array ? r.buffer : r instanceof ArrayBuffer ? r : ((0, y.warn)(`getArrayBuffer - unexpected data format: ${r}`), new Uint8Array(r).buffer);
      }
      class C {
        constructor(d) {
          this.source = d, this.isHttp = /^https?:/i.test(d.url), this.httpHeaders = this.isHttp && d.httpHeaders || {}, this._fullRequestReader = null, this._rangeRequestReaders = [];
        }
        get _progressiveDataLength() {
          return this._fullRequestReader?._loaded ?? 0;
        }
        getFullReader() {
          return (0, y.assert)(!this._fullRequestReader, "PDFFetchStream.getFullReader can only be called once."), this._fullRequestReader = new x(this), this._fullRequestReader;
        }
        getRangeReader(d, c) {
          if (c <= this._progressiveDataLength)
            return null;
          const m = new A(this, d, c);
          return this._rangeRequestReaders.push(m), m;
        }
        cancelAllRequests(d) {
          this._fullRequestReader?.cancel(d);
          for (const c of this._rangeRequestReaders.slice(0))
            c.cancel(d);
        }
      }
      class x {
        constructor(d) {
          this._stream = d, this._reader = null, this._loaded = 0, this._filename = null;
          const c = d.source;
          this._withCredentials = c.withCredentials || !1, this._contentLength = c.length, this._headersCapability = Promise.withResolvers(), this._disableRange = c.disableRange || !1, this._rangeChunkSize = c.rangeChunkSize, !this._rangeChunkSize && !this._disableRange && (this._disableRange = !0), this._abortController = new AbortController(), this._isStreamingSupported = !c.disableStream, this._isRangeSupported = !c.disableRange, this._headers = U(this._stream.httpHeaders);
          const m = c.url;
          fetch(m, N(this._headers, this._withCredentials, this._abortController)).then((s) => {
            if (!(0, B.validateResponseStatus)(s.status))
              throw (0, B.createResponseStatusError)(s.status, m);
            this._reader = s.body.getReader(), this._headersCapability.resolve();
            const g = (h) => s.headers.get(h), {
              allowRangeRequests: t,
              suggestedLength: i
            } = (0, B.validateRangeRequestCapabilities)({
              getResponseHeader: g,
              isHttp: this._stream.isHttp,
              rangeChunkSize: this._rangeChunkSize,
              disableRange: this._disableRange
            });
            this._isRangeSupported = t, this._contentLength = i || this._contentLength, this._filename = (0, B.extractFilenameFromHeader)(g), !this._isStreamingSupported && this._isRangeSupported && this.cancel(new y.AbortException("Streaming is disabled."));
          }).catch(this._headersCapability.reject), this.onProgress = null;
        }
        get headersReady() {
          return this._headersCapability.promise;
        }
        get filename() {
          return this._filename;
        }
        get contentLength() {
          return this._contentLength;
        }
        get isRangeSupported() {
          return this._isRangeSupported;
        }
        get isStreamingSupported() {
          return this._isStreamingSupported;
        }
        async read() {
          await this._headersCapability.promise;
          const {
            value: d,
            done: c
          } = await this._reader.read();
          return c ? {
            value: d,
            done: c
          } : (this._loaded += d.byteLength, this.onProgress?.({
            loaded: this._loaded,
            total: this._contentLength
          }), {
            value: L(d),
            done: !1
          });
        }
        cancel(d) {
          this._reader?.cancel(d), this._abortController.abort();
        }
      }
      class A {
        constructor(d, c, m) {
          this._stream = d, this._reader = null, this._loaded = 0;
          const s = d.source;
          this._withCredentials = s.withCredentials || !1, this._readCapability = Promise.withResolvers(), this._isStreamingSupported = !s.disableStream, this._abortController = new AbortController(), this._headers = U(this._stream.httpHeaders), this._headers.append("Range", `bytes=${c}-${m - 1}`);
          const g = s.url;
          fetch(g, N(this._headers, this._withCredentials, this._abortController)).then((t) => {
            if (!(0, B.validateResponseStatus)(t.status))
              throw (0, B.createResponseStatusError)(t.status, g);
            this._readCapability.resolve(), this._reader = t.body.getReader();
          }).catch(this._readCapability.reject), this.onProgress = null;
        }
        get isStreamingSupported() {
          return this._isStreamingSupported;
        }
        async read() {
          await this._readCapability.promise;
          const {
            value: d,
            done: c
          } = await this._reader.read();
          return c ? {
            value: d,
            done: c
          } : (this._loaded += d.byteLength, this.onProgress?.({
            loaded: this._loaded
          }), {
            value: L(d),
            done: !1
          });
        }
        cancel(d) {
          this._reader?.cancel(d), this._abortController.abort();
        }
      }
    }
  ),
  /***/
  10: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        FontFaceObject: () => (
          /* binding */
          N
        ),
        /* harmony export */
        FontLoader: () => (
          /* binding */
          B
        )
        /* harmony export */
      });
      var y = V(292);
      class B {
        #t = /* @__PURE__ */ new Set();
        constructor({
          ownerDocument: L = globalThis.document,
          styleElement: C = null
        }) {
          this._document = L, this.nativeFontFaces = /* @__PURE__ */ new Set(), this.styleElement = null, this.loadingRequests = [], this.loadTestFontId = 0;
        }
        addNativeFontFace(L) {
          this.nativeFontFaces.add(L), this._document.fonts.add(L);
        }
        removeNativeFontFace(L) {
          this.nativeFontFaces.delete(L), this._document.fonts.delete(L);
        }
        insertRule(L) {
          this.styleElement || (this.styleElement = this._document.createElement("style"), this._document.documentElement.getElementsByTagName("head")[0].append(this.styleElement));
          const C = this.styleElement.sheet;
          C.insertRule(L, C.cssRules.length);
        }
        clear() {
          for (const L of this.nativeFontFaces)
            this._document.fonts.delete(L);
          this.nativeFontFaces.clear(), this.#t.clear(), this.styleElement && (this.styleElement.remove(), this.styleElement = null);
        }
        async loadSystemFont({
          systemFontInfo: L,
          _inspectFont: C
        }) {
          if (!(!L || this.#t.has(L.loadedName))) {
            if ((0, y.assert)(!this.disableFontFace, "loadSystemFont shouldn't be called when `disableFontFace` is set."), this.isFontLoadingAPISupported) {
              const {
                loadedName: x,
                src: A,
                style: r
              } = L, d = new FontFace(x, A, r);
              this.addNativeFontFace(d);
              try {
                await d.load(), this.#t.add(x), C?.(L);
              } catch {
                (0, y.warn)(`Cannot load system font: ${L.baseFontName}, installing it could help to improve PDF rendering.`), this.removeNativeFontFace(d);
              }
              return;
            }
            (0, y.unreachable)("Not implemented: loadSystemFont without the Font Loading API.");
          }
        }
        async bind(L) {
          if (L.attached || L.missingFile && !L.systemFontInfo)
            return;
          if (L.attached = !0, L.systemFontInfo) {
            await this.loadSystemFont(L);
            return;
          }
          if (this.isFontLoadingAPISupported) {
            const x = L.createNativeFontFace();
            if (x) {
              this.addNativeFontFace(x);
              try {
                await x.loaded;
              } catch (A) {
                throw (0, y.warn)(`Failed to load font '${x.family}': '${A}'.`), L.disableFontFace = !0, A;
              }
            }
            return;
          }
          const C = L.createFontFaceRule();
          if (C) {
            if (this.insertRule(C), this.isSyncFontLoadingSupported)
              return;
            await new Promise((x) => {
              const A = this._queueLoadingCallback(x);
              this._prepareFontLoadEvent(L, A);
            });
          }
        }
        get isFontLoadingAPISupported() {
          const L = !!this._document?.fonts;
          return (0, y.shadow)(this, "isFontLoadingAPISupported", L);
        }
        get isSyncFontLoadingSupported() {
          let L = !1;
          return (y.isNodeJS || typeof navigator < "u" && typeof navigator?.userAgent == "string" && /Mozilla\/5.0.*?rv:\d+.*? Gecko/.test(navigator.userAgent)) && (L = !0), (0, y.shadow)(this, "isSyncFontLoadingSupported", L);
        }
        _queueLoadingCallback(L) {
          function C() {
            for ((0, y.assert)(!A.done, "completeRequest() cannot be called twice."), A.done = !0; x.length > 0 && x[0].done; ) {
              const r = x.shift();
              setTimeout(r.callback, 0);
            }
          }
          const {
            loadingRequests: x
          } = this, A = {
            done: !1,
            complete: C,
            callback: L
          };
          return x.push(A), A;
        }
        get _loadTestFont() {
          const L = atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==");
          return (0, y.shadow)(this, "_loadTestFont", L);
        }
        _prepareFontLoadEvent(L, C) {
          function x(_, z) {
            return _.charCodeAt(z) << 24 | _.charCodeAt(z + 1) << 16 | _.charCodeAt(z + 2) << 8 | _.charCodeAt(z + 3) & 255;
          }
          function A(_, z, K, nt) {
            const j = _.substring(0, z), H = _.substring(z + K);
            return j + nt + H;
          }
          let r, d;
          const c = this._document.createElement("canvas");
          c.width = 1, c.height = 1;
          const m = c.getContext("2d");
          let s = 0;
          function g(_, z) {
            if (++s > 30) {
              (0, y.warn)("Load test font never loaded."), z();
              return;
            }
            if (m.font = "30px " + _, m.fillText(".", 0, 20), m.getImageData(0, 0, 1, 1).data[3] > 0) {
              z();
              return;
            }
            setTimeout(g.bind(null, _, z));
          }
          const t = `lt${Date.now()}${this.loadTestFontId++}`;
          let i = this._loadTestFont;
          i = A(i, 976, t.length, t);
          const f = 16, w = 1482184792;
          let S = x(i, f);
          for (r = 0, d = t.length - 3; r < d; r += 4)
            S = S - w + x(t, r) | 0;
          r < t.length && (S = S - w + x(t + "XXX", r) | 0), i = A(i, f, 4, (0, y.string32)(S));
          const P = `url(data:font/opentype;base64,${btoa(i)});`, M = `@font-face {font-family:"${t}";src:${P}}`;
          this.insertRule(M);
          const O = this._document.createElement("div");
          O.style.visibility = "hidden", O.style.width = O.style.height = "10px", O.style.position = "absolute", O.style.top = O.style.left = "0px";
          for (const _ of [L.loadedName, t]) {
            const z = this._document.createElement("span");
            z.textContent = "Hi", z.style.fontFamily = _, O.append(z);
          }
          this._document.body.append(O), g(t, () => {
            O.remove(), C.complete();
          });
        }
      }
      class N {
        constructor(L, {
          disableFontFace: C = !1,
          ignoreErrors: x = !1,
          inspectFont: A = null
        }) {
          this.compiledGlyphs = /* @__PURE__ */ Object.create(null);
          for (const r in L)
            this[r] = L[r];
          this.disableFontFace = C === !0, this.ignoreErrors = x === !0, this._inspectFont = A;
        }
        createNativeFontFace() {
          if (!this.data || this.disableFontFace)
            return null;
          let L;
          if (!this.cssFontInfo)
            L = new FontFace(this.loadedName, this.data, {});
          else {
            const C = {
              weight: this.cssFontInfo.fontWeight
            };
            this.cssFontInfo.italicAngle && (C.style = `oblique ${this.cssFontInfo.italicAngle}deg`), L = new FontFace(this.cssFontInfo.fontFamily, this.data, C);
          }
          return this._inspectFont?.(this), L;
        }
        createFontFaceRule() {
          if (!this.data || this.disableFontFace)
            return null;
          const L = (0, y.bytesToString)(this.data), C = `url(data:${this.mimetype};base64,${btoa(L)});`;
          let x;
          if (!this.cssFontInfo)
            x = `@font-face {font-family:"${this.loadedName}";src:${C}}`;
          else {
            let A = `font-weight: ${this.cssFontInfo.fontWeight};`;
            this.cssFontInfo.italicAngle && (A += `font-style: oblique ${this.cssFontInfo.italicAngle}deg;`), x = `@font-face {font-family:"${this.cssFontInfo.fontFamily}";${A}src:${C}}`;
          }
          return this._inspectFont?.(this, C), x;
        }
        getPathGenerator(L, C) {
          if (this.compiledGlyphs[C] !== void 0)
            return this.compiledGlyphs[C];
          let x;
          try {
            x = L.get(this.loadedName + "_path_" + C);
          } catch (r) {
            if (!this.ignoreErrors)
              throw r;
            (0, y.warn)(`getPathGenerator - ignoring character: "${r}".`);
          }
          if (!Array.isArray(x) || x.length === 0)
            return this.compiledGlyphs[C] = function(r, d) {
            };
          const A = [];
          for (let r = 0, d = x.length; r < d; )
            switch (x[r++]) {
              case y.FontRenderOps.BEZIER_CURVE_TO:
                {
                  const [c, m, s, g, t, i] = x.slice(r, r + 6);
                  A.push((h) => h.bezierCurveTo(c, m, s, g, t, i)), r += 6;
                }
                break;
              case y.FontRenderOps.MOVE_TO:
                {
                  const [c, m] = x.slice(r, r + 2);
                  A.push((s) => s.moveTo(c, m)), r += 2;
                }
                break;
              case y.FontRenderOps.LINE_TO:
                {
                  const [c, m] = x.slice(r, r + 2);
                  A.push((s) => s.lineTo(c, m)), r += 2;
                }
                break;
              case y.FontRenderOps.QUADRATIC_CURVE_TO:
                {
                  const [c, m, s, g] = x.slice(r, r + 4);
                  A.push((t) => t.quadraticCurveTo(c, m, s, g)), r += 4;
                }
                break;
              case y.FontRenderOps.RESTORE:
                A.push((c) => c.restore());
                break;
              case y.FontRenderOps.SAVE:
                A.push((c) => c.save());
                break;
              case y.FontRenderOps.SCALE:
                (0, y.assert)(A.length === 2, "Scale command is only valid at the third position.");
                break;
              case y.FontRenderOps.TRANSFORM:
                {
                  const [c, m, s, g, t, i] = x.slice(r, r + 6);
                  A.push((h) => h.transform(c, m, s, g, t, i)), r += 6;
                }
                break;
              case y.FontRenderOps.TRANSLATE:
                {
                  const [c, m] = x.slice(r, r + 2);
                  A.push((s) => s.translate(c, m)), r += 2;
                }
                break;
            }
          return this.compiledGlyphs[C] = function(d, c) {
            A[0](d), A[1](d), d.scale(c, -c);
            for (let m = 2, s = A.length; m < s; m++)
              A[m](d);
          };
        }
      }
    }
  ),
  /***/
  62: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        Metadata: () => (
          /* binding */
          B
        )
        /* harmony export */
      });
      var y = V(292);
      class B {
        #t;
        #e;
        constructor({
          parsedData: U,
          rawData: L
        }) {
          this.#t = U, this.#e = L;
        }
        getRaw() {
          return this.#e;
        }
        get(U) {
          return this.#t.get(U) ?? null;
        }
        getAll() {
          return (0, y.objectFromMap)(this.#t);
        }
        has(U) {
          return this.#t.has(U);
        }
      }
    }
  ),
  /***/
  457: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        PDFNetworkStream: () => (
          /* binding */
          x
        )
        /* harmony export */
      });
      var y = V(292), B = V(490);
      const N = 200, U = 206;
      function L(d) {
        const c = d.response;
        return typeof c != "string" ? c : (0, y.stringToBytes)(c).buffer;
      }
      class C {
        constructor(c, m = {}) {
          this.url = c, this.isHttp = /^https?:/i.test(c), this.httpHeaders = this.isHttp && m.httpHeaders || /* @__PURE__ */ Object.create(null), this.withCredentials = m.withCredentials || !1, this.currXhrId = 0, this.pendingRequests = /* @__PURE__ */ Object.create(null);
        }
        requestRange(c, m, s) {
          const g = {
            begin: c,
            end: m
          };
          for (const t in s)
            g[t] = s[t];
          return this.request(g);
        }
        requestFull(c) {
          return this.request(c);
        }
        request(c) {
          const m = new XMLHttpRequest(), s = this.currXhrId++, g = this.pendingRequests[s] = {
            xhr: m
          };
          m.open("GET", this.url), m.withCredentials = this.withCredentials;
          for (const t in this.httpHeaders) {
            const i = this.httpHeaders[t];
            i !== void 0 && m.setRequestHeader(t, i);
          }
          return this.isHttp && "begin" in c && "end" in c ? (m.setRequestHeader("Range", `bytes=${c.begin}-${c.end - 1}`), g.expectedStatus = U) : g.expectedStatus = N, m.responseType = "arraybuffer", c.onError && (m.onerror = function(t) {
            c.onError(m.status);
          }), m.onreadystatechange = this.onStateChange.bind(this, s), m.onprogress = this.onProgress.bind(this, s), g.onHeadersReceived = c.onHeadersReceived, g.onDone = c.onDone, g.onError = c.onError, g.onProgress = c.onProgress, m.send(null), s;
        }
        onProgress(c, m) {
          const s = this.pendingRequests[c];
          s && s.onProgress?.(m);
        }
        onStateChange(c, m) {
          const s = this.pendingRequests[c];
          if (!s)
            return;
          const g = s.xhr;
          if (g.readyState >= 2 && s.onHeadersReceived && (s.onHeadersReceived(), delete s.onHeadersReceived), g.readyState !== 4 || !(c in this.pendingRequests))
            return;
          if (delete this.pendingRequests[c], g.status === 0 && this.isHttp) {
            s.onError?.(g.status);
            return;
          }
          const t = g.status || N;
          if (!(t === N && s.expectedStatus === U) && t !== s.expectedStatus) {
            s.onError?.(g.status);
            return;
          }
          const h = L(g);
          if (t === U) {
            const f = g.getResponseHeader("Content-Range"), w = /bytes (\d+)-(\d+)\/(\d+)/.exec(f);
            s.onDone({
              begin: parseInt(w[1], 10),
              chunk: h
            });
          } else h ? s.onDone({
            begin: 0,
            chunk: h
          }) : s.onError?.(g.status);
        }
        getRequestXhr(c) {
          return this.pendingRequests[c].xhr;
        }
        isPendingRequest(c) {
          return c in this.pendingRequests;
        }
        abortRequest(c) {
          const m = this.pendingRequests[c].xhr;
          delete this.pendingRequests[c], m.abort();
        }
      }
      class x {
        constructor(c) {
          this._source = c, this._manager = new C(c.url, {
            httpHeaders: c.httpHeaders,
            withCredentials: c.withCredentials
          }), this._rangeChunkSize = c.rangeChunkSize, this._fullRequestReader = null, this._rangeRequestReaders = [];
        }
        _onRangeRequestReaderClosed(c) {
          const m = this._rangeRequestReaders.indexOf(c);
          m >= 0 && this._rangeRequestReaders.splice(m, 1);
        }
        getFullReader() {
          return (0, y.assert)(!this._fullRequestReader, "PDFNetworkStream.getFullReader can only be called once."), this._fullRequestReader = new A(this._manager, this._source), this._fullRequestReader;
        }
        getRangeReader(c, m) {
          const s = new r(this._manager, c, m);
          return s.onClosed = this._onRangeRequestReaderClosed.bind(this), this._rangeRequestReaders.push(s), s;
        }
        cancelAllRequests(c) {
          this._fullRequestReader?.cancel(c);
          for (const m of this._rangeRequestReaders.slice(0))
            m.cancel(c);
        }
      }
      class A {
        constructor(c, m) {
          this._manager = c;
          const s = {
            onHeadersReceived: this._onHeadersReceived.bind(this),
            onDone: this._onDone.bind(this),
            onError: this._onError.bind(this),
            onProgress: this._onProgress.bind(this)
          };
          this._url = m.url, this._fullRequestId = c.requestFull(s), this._headersReceivedCapability = Promise.withResolvers(), this._disableRange = m.disableRange || !1, this._contentLength = m.length, this._rangeChunkSize = m.rangeChunkSize, !this._rangeChunkSize && !this._disableRange && (this._disableRange = !0), this._isStreamingSupported = !1, this._isRangeSupported = !1, this._cachedChunks = [], this._requests = [], this._done = !1, this._storedError = void 0, this._filename = null, this.onProgress = null;
        }
        _onHeadersReceived() {
          const c = this._fullRequestId, m = this._manager.getRequestXhr(c), s = (i) => m.getResponseHeader(i), {
            allowRangeRequests: g,
            suggestedLength: t
          } = (0, B.validateRangeRequestCapabilities)({
            getResponseHeader: s,
            isHttp: this._manager.isHttp,
            rangeChunkSize: this._rangeChunkSize,
            disableRange: this._disableRange
          });
          g && (this._isRangeSupported = !0), this._contentLength = t || this._contentLength, this._filename = (0, B.extractFilenameFromHeader)(s), this._isRangeSupported && this._manager.abortRequest(c), this._headersReceivedCapability.resolve();
        }
        _onDone(c) {
          if (c && (this._requests.length > 0 ? this._requests.shift().resolve({
            value: c.chunk,
            done: !1
          }) : this._cachedChunks.push(c.chunk)), this._done = !0, !(this._cachedChunks.length > 0)) {
            for (const m of this._requests)
              m.resolve({
                value: void 0,
                done: !0
              });
            this._requests.length = 0;
          }
        }
        _onError(c) {
          this._storedError = (0, B.createResponseStatusError)(c, this._url), this._headersReceivedCapability.reject(this._storedError);
          for (const m of this._requests)
            m.reject(this._storedError);
          this._requests.length = 0, this._cachedChunks.length = 0;
        }
        _onProgress(c) {
          this.onProgress?.({
            loaded: c.loaded,
            total: c.lengthComputable ? c.total : this._contentLength
          });
        }
        get filename() {
          return this._filename;
        }
        get isRangeSupported() {
          return this._isRangeSupported;
        }
        get isStreamingSupported() {
          return this._isStreamingSupported;
        }
        get contentLength() {
          return this._contentLength;
        }
        get headersReady() {
          return this._headersReceivedCapability.promise;
        }
        async read() {
          if (this._storedError)
            throw this._storedError;
          if (this._cachedChunks.length > 0)
            return {
              value: this._cachedChunks.shift(),
              done: !1
            };
          if (this._done)
            return {
              value: void 0,
              done: !0
            };
          const c = Promise.withResolvers();
          return this._requests.push(c), c.promise;
        }
        cancel(c) {
          this._done = !0, this._headersReceivedCapability.reject(c);
          for (const m of this._requests)
            m.resolve({
              value: void 0,
              done: !0
            });
          this._requests.length = 0, this._manager.isPendingRequest(this._fullRequestId) && this._manager.abortRequest(this._fullRequestId), this._fullRequestReader = null;
        }
      }
      class r {
        constructor(c, m, s) {
          this._manager = c;
          const g = {
            onDone: this._onDone.bind(this),
            onError: this._onError.bind(this),
            onProgress: this._onProgress.bind(this)
          };
          this._url = c.url, this._requestId = c.requestRange(m, s, g), this._requests = [], this._queuedChunk = null, this._done = !1, this._storedError = void 0, this.onProgress = null, this.onClosed = null;
        }
        _close() {
          this.onClosed?.(this);
        }
        _onDone(c) {
          const m = c.chunk;
          this._requests.length > 0 ? this._requests.shift().resolve({
            value: m,
            done: !1
          }) : this._queuedChunk = m, this._done = !0;
          for (const s of this._requests)
            s.resolve({
              value: void 0,
              done: !0
            });
          this._requests.length = 0, this._close();
        }
        _onError(c) {
          this._storedError = (0, B.createResponseStatusError)(c, this._url);
          for (const m of this._requests)
            m.reject(this._storedError);
          this._requests.length = 0, this._queuedChunk = null;
        }
        _onProgress(c) {
          this.isStreamingSupported || this.onProgress?.({
            loaded: c.loaded
          });
        }
        get isStreamingSupported() {
          return !1;
        }
        async read() {
          if (this._storedError)
            throw this._storedError;
          if (this._queuedChunk !== null) {
            const m = this._queuedChunk;
            return this._queuedChunk = null, {
              value: m,
              done: !1
            };
          }
          if (this._done)
            return {
              value: void 0,
              done: !0
            };
          const c = Promise.withResolvers();
          return this._requests.push(c), c.promise;
        }
        cancel(c) {
          this._done = !0;
          for (const m of this._requests)
            m.resolve({
              value: void 0,
              done: !0
            });
          this._requests.length = 0, this._manager.isPendingRequest(this._requestId) && this._manager.abortRequest(this._requestId), this._close();
        }
      }
    }
  ),
  /***/
  490: (
    /***/
    (at, W, V) => {
      V.d(W, {
        createResponseStatusError: () => (
          /* binding */
          C
        ),
        extractFilenameFromHeader: () => (
          /* binding */
          L
        ),
        validateRangeRequestCapabilities: () => (
          /* binding */
          U
        ),
        validateResponseStatus: () => (
          /* binding */
          x
        )
      });
      var y = V(292);
      function B(A) {
        let r = !0, d = c("filename\\*", "i").exec(A);
        if (d) {
          d = d[1];
          let f = t(d);
          return f = unescape(f), f = i(f), f = h(f), s(f);
        }
        if (d = g(A), d) {
          const f = h(d);
          return s(f);
        }
        if (d = c("filename", "i").exec(A), d) {
          d = d[1];
          let f = t(d);
          return f = h(f), s(f);
        }
        function c(f, w) {
          return new RegExp("(?:^|;)\\s*" + f + '\\s*=\\s*([^";\\s][^;\\s]*|"(?:[^"\\\\]|\\\\"?)+"?)', w);
        }
        function m(f, w) {
          if (f) {
            if (!/^[\x00-\xFF]+$/.test(w))
              return w;
            try {
              const S = new TextDecoder(f, {
                fatal: !0
              }), P = (0, y.stringToBytes)(w);
              w = S.decode(P), r = !1;
            } catch {
            }
          }
          return w;
        }
        function s(f) {
          return r && /[\x80-\xff]/.test(f) && (f = m("utf-8", f), r && (f = m("iso-8859-1", f))), f;
        }
        function g(f) {
          const w = [];
          let S;
          const P = c("filename\\*((?!0\\d)\\d+)(\\*?)", "ig");
          for (; (S = P.exec(f)) !== null; ) {
            let [, O, _, z] = S;
            if (O = parseInt(O, 10), O in w) {
              if (O === 0)
                break;
              continue;
            }
            w[O] = [_, z];
          }
          const M = [];
          for (let O = 0; O < w.length && O in w; ++O) {
            let [_, z] = w[O];
            z = t(z), _ && (z = unescape(z), O === 0 && (z = i(z))), M.push(z);
          }
          return M.join("");
        }
        function t(f) {
          if (f.startsWith('"')) {
            const w = f.slice(1).split('\\"');
            for (let S = 0; S < w.length; ++S) {
              const P = w[S].indexOf('"');
              P !== -1 && (w[S] = w[S].slice(0, P), w.length = S + 1), w[S] = w[S].replaceAll(/\\(.)/g, "$1");
            }
            f = w.join('"');
          }
          return f;
        }
        function i(f) {
          const w = f.indexOf("'");
          if (w === -1)
            return f;
          const S = f.slice(0, w), M = f.slice(w + 1).replace(/^[^']*'/, "");
          return m(S, M);
        }
        function h(f) {
          return !f.startsWith("=?") || /[\x00-\x19\x80-\xff]/.test(f) ? f : f.replaceAll(/=\?([\w-]*)\?([QqBb])\?((?:[^?]|\?(?!=))*)\?=/g, function(w, S, P, M) {
            if (P === "q" || P === "Q")
              return M = M.replaceAll("_", " "), M = M.replaceAll(/=([0-9a-fA-F]{2})/g, function(O, _) {
                return String.fromCharCode(parseInt(_, 16));
              }), m(S, M);
            try {
              M = atob(M);
            } catch {
            }
            return m(S, M);
          });
        }
        return "";
      }
      var N = V(419);
      function U({
        getResponseHeader: A,
        isHttp: r,
        rangeChunkSize: d,
        disableRange: c
      }) {
        const m = {
          allowRangeRequests: !1,
          suggestedLength: void 0
        }, s = parseInt(A("Content-Length"), 10);
        return !Number.isInteger(s) || (m.suggestedLength = s, s <= 2 * d) || c || !r || A("Accept-Ranges") !== "bytes" || (A("Content-Encoding") || "identity") !== "identity" || (m.allowRangeRequests = !0), m;
      }
      function L(A) {
        const r = A("Content-Disposition");
        if (r) {
          let d = B(r);
          if (d.includes("%"))
            try {
              d = decodeURIComponent(d);
            } catch {
            }
          if ((0, N.isPdfFile)(d))
            return d;
        }
        return null;
      }
      function C(A, r) {
        return A === 404 || A === 0 && r.startsWith("file:") ? new y.MissingPDFException('Missing PDF "' + r + '".') : new y.UnexpectedResponseException(`Unexpected server response (${A}) while retrieving PDF "${r}".`, A);
      }
      function x(A) {
        return A === 200 || A === 206;
      }
    }
  ),
  /***/
  786: (
    /***/
    (at, W, V) => {
      V.a(at, async (y, B) => {
        try {
          let d = function(w) {
            const S = A.parse(w);
            return S.protocol === "file:" || S.host ? S : /^[a-z]:[/\\]/i.test(w) ? A.parse(`file:///${w}`) : (S.host || (S.protocol = "file:"), S);
          }, g = function(w, S) {
            return {
              protocol: w.protocol,
              auth: w.auth,
              host: w.hostname,
              port: w.port,
              path: w.path,
              method: "GET",
              headers: S
            };
          };
          V.d(W, {
            /* harmony export */
            PDFNodeStream: () => (
              /* binding */
              c
            )
            /* harmony export */
          });
          var N = V(292), U = V(490);
          let L, C, x, A;
          N.isNodeJS && (L = await import(
            /*webpackIgnore: true*/
            "./__vite-browser-external-DYxpcVy9.js"
          ), C = await import(
            /*webpackIgnore: true*/
            "./__vite-browser-external-DYxpcVy9.js"
          ), x = await import(
            /*webpackIgnore: true*/
            "./__vite-browser-external-DYxpcVy9.js"
          ), A = await import(
            /*webpackIgnore: true*/
            "./__vite-browser-external-DYxpcVy9.js"
          ));
          const r = /^file:\/\/\/[a-zA-Z]:\//;
          class c {
            constructor(S) {
              this.source = S, this.url = d(S.url), this.isHttp = this.url.protocol === "http:" || this.url.protocol === "https:", this.isFsUrl = this.url.protocol === "file:", this.httpHeaders = this.isHttp && S.httpHeaders || {}, this._fullRequestReader = null, this._rangeRequestReaders = [];
            }
            get _progressiveDataLength() {
              return this._fullRequestReader?._loaded ?? 0;
            }
            getFullReader() {
              return (0, N.assert)(!this._fullRequestReader, "PDFNodeStream.getFullReader can only be called once."), this._fullRequestReader = this.isFsUrl ? new h(this) : new t(this), this._fullRequestReader;
            }
            getRangeReader(S, P) {
              if (P <= this._progressiveDataLength)
                return null;
              const M = this.isFsUrl ? new f(this, S, P) : new i(this, S, P);
              return this._rangeRequestReaders.push(M), M;
            }
            cancelAllRequests(S) {
              this._fullRequestReader?.cancel(S);
              for (const P of this._rangeRequestReaders.slice(0))
                P.cancel(S);
            }
          }
          class m {
            constructor(S) {
              this._url = S.url, this._done = !1, this._storedError = null, this.onProgress = null;
              const P = S.source;
              this._contentLength = P.length, this._loaded = 0, this._filename = null, this._disableRange = P.disableRange || !1, this._rangeChunkSize = P.rangeChunkSize, !this._rangeChunkSize && !this._disableRange && (this._disableRange = !0), this._isStreamingSupported = !P.disableStream, this._isRangeSupported = !P.disableRange, this._readableStream = null, this._readCapability = Promise.withResolvers(), this._headersCapability = Promise.withResolvers();
            }
            get headersReady() {
              return this._headersCapability.promise;
            }
            get filename() {
              return this._filename;
            }
            get contentLength() {
              return this._contentLength;
            }
            get isRangeSupported() {
              return this._isRangeSupported;
            }
            get isStreamingSupported() {
              return this._isStreamingSupported;
            }
            async read() {
              if (await this._readCapability.promise, this._done)
                return {
                  value: void 0,
                  done: !0
                };
              if (this._storedError)
                throw this._storedError;
              const S = this._readableStream.read();
              return S === null ? (this._readCapability = Promise.withResolvers(), this.read()) : (this._loaded += S.length, this.onProgress?.({
                loaded: this._loaded,
                total: this._contentLength
              }), {
                value: new Uint8Array(S).buffer,
                done: !1
              });
            }
            cancel(S) {
              if (!this._readableStream) {
                this._error(S);
                return;
              }
              this._readableStream.destroy(S);
            }
            _error(S) {
              this._storedError = S, this._readCapability.resolve();
            }
            _setReadableStream(S) {
              this._readableStream = S, S.on("readable", () => {
                this._readCapability.resolve();
              }), S.on("end", () => {
                S.destroy(), this._done = !0, this._readCapability.resolve();
              }), S.on("error", (P) => {
                this._error(P);
              }), !this._isStreamingSupported && this._isRangeSupported && this._error(new N.AbortException("streaming is disabled")), this._storedError && this._readableStream.destroy(this._storedError);
            }
          }
          class s {
            constructor(S) {
              this._url = S.url, this._done = !1, this._storedError = null, this.onProgress = null, this._loaded = 0, this._readableStream = null, this._readCapability = Promise.withResolvers();
              const P = S.source;
              this._isStreamingSupported = !P.disableStream;
            }
            get isStreamingSupported() {
              return this._isStreamingSupported;
            }
            async read() {
              if (await this._readCapability.promise, this._done)
                return {
                  value: void 0,
                  done: !0
                };
              if (this._storedError)
                throw this._storedError;
              const S = this._readableStream.read();
              return S === null ? (this._readCapability = Promise.withResolvers(), this.read()) : (this._loaded += S.length, this.onProgress?.({
                loaded: this._loaded
              }), {
                value: new Uint8Array(S).buffer,
                done: !1
              });
            }
            cancel(S) {
              if (!this._readableStream) {
                this._error(S);
                return;
              }
              this._readableStream.destroy(S);
            }
            _error(S) {
              this._storedError = S, this._readCapability.resolve();
            }
            _setReadableStream(S) {
              this._readableStream = S, S.on("readable", () => {
                this._readCapability.resolve();
              }), S.on("end", () => {
                S.destroy(), this._done = !0, this._readCapability.resolve();
              }), S.on("error", (P) => {
                this._error(P);
              }), this._storedError && this._readableStream.destroy(this._storedError);
            }
          }
          class t extends m {
            constructor(S) {
              super(S);
              const P = (M) => {
                if (M.statusCode === 404) {
                  const K = new N.MissingPDFException(`Missing PDF "${this._url}".`);
                  this._storedError = K, this._headersCapability.reject(K);
                  return;
                }
                this._headersCapability.resolve(), this._setReadableStream(M);
                const O = (K) => this._readableStream.headers[K.toLowerCase()], {
                  allowRangeRequests: _,
                  suggestedLength: z
                } = (0, U.validateRangeRequestCapabilities)({
                  getResponseHeader: O,
                  isHttp: S.isHttp,
                  rangeChunkSize: this._rangeChunkSize,
                  disableRange: this._disableRange
                });
                this._isRangeSupported = _, this._contentLength = z || this._contentLength, this._filename = (0, U.extractFilenameFromHeader)(O);
              };
              this._request = null, this._url.protocol === "http:" ? this._request = C.request(g(this._url, S.httpHeaders), P) : this._request = x.request(g(this._url, S.httpHeaders), P), this._request.on("error", (M) => {
                this._storedError = M, this._headersCapability.reject(M);
              }), this._request.end();
            }
          }
          class i extends s {
            constructor(S, P, M) {
              super(S), this._httpHeaders = {};
              for (const _ in S.httpHeaders) {
                const z = S.httpHeaders[_];
                z !== void 0 && (this._httpHeaders[_] = z);
              }
              this._httpHeaders.Range = `bytes=${P}-${M - 1}`;
              const O = (_) => {
                if (_.statusCode === 404) {
                  const z = new N.MissingPDFException(`Missing PDF "${this._url}".`);
                  this._storedError = z;
                  return;
                }
                this._setReadableStream(_);
              };
              this._request = null, this._url.protocol === "http:" ? this._request = C.request(g(this._url, this._httpHeaders), O) : this._request = x.request(g(this._url, this._httpHeaders), O), this._request.on("error", (_) => {
                this._storedError = _;
              }), this._request.end();
            }
          }
          class h extends m {
            constructor(S) {
              super(S);
              let P = decodeURIComponent(this._url.path);
              r.test(this._url.href) && (P = P.replace(/^\//, "")), L.promises.lstat(P).then((M) => {
                this._contentLength = M.size, this._setReadableStream(L.createReadStream(P)), this._headersCapability.resolve();
              }, (M) => {
                M.code === "ENOENT" && (M = new N.MissingPDFException(`Missing PDF "${P}".`)), this._storedError = M, this._headersCapability.reject(M);
              });
            }
          }
          class f extends s {
            constructor(S, P, M) {
              super(S);
              let O = decodeURIComponent(this._url.path);
              r.test(this._url.href) && (O = O.replace(/^\//, "")), this._setReadableStream(L.createReadStream(O, {
                start: P,
                end: M - 1
              }));
            }
          }
          B();
        } catch (L) {
          B(L);
        }
      }, 1);
    }
  ),
  /***/
  573: (
    /***/
    (at, W, V) => {
      V.a(at, async (y, B) => {
        try {
          V.d(W, {
            /* harmony export */
            NodeCMapReaderFactory: () => (
              /* binding */
              c
            ),
            /* harmony export */
            NodeCanvasFactory: () => (
              /* binding */
              d
            ),
            /* harmony export */
            NodeFilterFactory: () => (
              /* binding */
              r
            ),
            /* harmony export */
            NodeStandardFontDataFactory: () => (
              /* binding */
              m
            )
            /* harmony export */
          });
          var N = V(583), U = V(292);
          let L, C, x;
          if (U.isNodeJS) {
            L = await import(
              /*webpackIgnore: true*/
              "./__vite-browser-external-DYxpcVy9.js"
            );
            try {
              C = await import(
                /*webpackIgnore: true*/
                "./__vite-browser-external-DYxpcVy9.js"
              );
            } catch {
            }
            try {
              x = await import(
                /*webpackIgnore: true*/
                "./index-BfdXe_BH.js"
              );
            } catch {
            }
          }
          const A = function(s) {
            return L.promises.readFile(s).then((g) => new Uint8Array(g));
          };
          class r extends N.BaseFilterFactory {
          }
          class d extends N.BaseCanvasFactory {
            _createCanvas(g, t) {
              return C.createCanvas(g, t);
            }
          }
          class c extends N.BaseCMapReaderFactory {
            _fetchData(g, t) {
              return A(g).then((i) => ({
                cMapData: i,
                compressionType: t
              }));
            }
          }
          class m extends N.BaseStandardFontDataFactory {
            _fetchData(g) {
              return A(g);
            }
          }
          B();
        } catch (L) {
          B(L);
        }
      }, 1);
    }
  ),
  /***/
  626: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        OptionalContentConfig: () => (
          /* binding */
          L
        )
        /* harmony export */
      });
      var y = V(292), B = V(651);
      const N = Symbol("INTERNAL");
      class U {
        #t = !1;
        #e = !1;
        #s = !1;
        #n = !0;
        constructor(x, {
          name: A,
          intent: r,
          usage: d
        }) {
          this.#t = !!(x & y.RenderingIntentFlag.DISPLAY), this.#e = !!(x & y.RenderingIntentFlag.PRINT), this.name = A, this.intent = r, this.usage = d;
        }
        get visible() {
          if (this.#s)
            return this.#n;
          if (!this.#n)
            return !1;
          const {
            print: x,
            view: A
          } = this.usage;
          return this.#t ? A?.viewState !== "OFF" : this.#e ? x?.printState !== "OFF" : !0;
        }
        _setVisible(x, A, r = !1) {
          x !== N && (0, y.unreachable)("Internal method `_setVisible` called."), this.#s = r, this.#n = A;
        }
      }
      class L {
        #t = null;
        #e = /* @__PURE__ */ new Map();
        #s = null;
        #n = null;
        constructor(x, A = y.RenderingIntentFlag.DISPLAY) {
          if (this.renderingIntent = A, this.name = null, this.creator = null, x !== null) {
            this.name = x.name, this.creator = x.creator, this.#n = x.order;
            for (const r of x.groups)
              this.#e.set(r.id, new U(A, r));
            if (x.baseState === "OFF")
              for (const r of this.#e.values())
                r._setVisible(N, !1);
            for (const r of x.on)
              this.#e.get(r)._setVisible(N, !0);
            for (const r of x.off)
              this.#e.get(r)._setVisible(N, !1);
            this.#s = this.getHash();
          }
        }
        #r(x) {
          const A = x.length;
          if (A < 2)
            return !0;
          const r = x[0];
          for (let d = 1; d < A; d++) {
            const c = x[d];
            let m;
            if (Array.isArray(c))
              m = this.#r(c);
            else if (this.#e.has(c))
              m = this.#e.get(c).visible;
            else
              return (0, y.warn)(`Optional content group not found: ${c}`), !0;
            switch (r) {
              case "And":
                if (!m)
                  return !1;
                break;
              case "Or":
                if (m)
                  return !0;
                break;
              case "Not":
                return !m;
              default:
                return !0;
            }
          }
          return r === "And";
        }
        isVisible(x) {
          if (this.#e.size === 0)
            return !0;
          if (!x)
            return (0, y.info)("Optional content group not defined."), !0;
          if (x.type === "OCG")
            return this.#e.has(x.id) ? this.#e.get(x.id).visible : ((0, y.warn)(`Optional content group not found: ${x.id}`), !0);
          if (x.type === "OCMD") {
            if (x.expression)
              return this.#r(x.expression);
            if (!x.policy || x.policy === "AnyOn") {
              for (const A of x.ids) {
                if (!this.#e.has(A))
                  return (0, y.warn)(`Optional content group not found: ${A}`), !0;
                if (this.#e.get(A).visible)
                  return !0;
              }
              return !1;
            } else if (x.policy === "AllOn") {
              for (const A of x.ids) {
                if (!this.#e.has(A))
                  return (0, y.warn)(`Optional content group not found: ${A}`), !0;
                if (!this.#e.get(A).visible)
                  return !1;
              }
              return !0;
            } else if (x.policy === "AnyOff") {
              for (const A of x.ids) {
                if (!this.#e.has(A))
                  return (0, y.warn)(`Optional content group not found: ${A}`), !0;
                if (!this.#e.get(A).visible)
                  return !0;
              }
              return !1;
            } else if (x.policy === "AllOff") {
              for (const A of x.ids) {
                if (!this.#e.has(A))
                  return (0, y.warn)(`Optional content group not found: ${A}`), !0;
                if (this.#e.get(A).visible)
                  return !1;
              }
              return !0;
            }
            return (0, y.warn)(`Unknown optional content policy ${x.policy}.`), !0;
          }
          return (0, y.warn)(`Unknown group type ${x.type}.`), !0;
        }
        setVisibility(x, A = !0) {
          const r = this.#e.get(x);
          if (!r) {
            (0, y.warn)(`Optional content group not found: ${x}`);
            return;
          }
          r._setVisible(N, !!A, !0), this.#t = null;
        }
        setOCGState({
          state: x,
          preserveRB: A
        }) {
          let r;
          for (const d of x) {
            switch (d) {
              case "ON":
              case "OFF":
              case "Toggle":
                r = d;
                continue;
            }
            const c = this.#e.get(d);
            if (c)
              switch (r) {
                case "ON":
                  c._setVisible(N, !0);
                  break;
                case "OFF":
                  c._setVisible(N, !1);
                  break;
                case "Toggle":
                  c._setVisible(N, !c.visible);
                  break;
              }
          }
          this.#t = null;
        }
        get hasInitialVisibility() {
          return this.#s === null || this.getHash() === this.#s;
        }
        getOrder() {
          return this.#e.size ? this.#n ? this.#n.slice() : [...this.#e.keys()] : null;
        }
        getGroups() {
          return this.#e.size > 0 ? (0, y.objectFromMap)(this.#e) : null;
        }
        getGroup(x) {
          return this.#e.get(x) || null;
        }
        getHash() {
          if (this.#t !== null)
            return this.#t;
          const x = new B.MurmurHash3_64();
          for (const [A, r] of this.#e)
            x.update(`${A}:${r.visible}`);
          return this.#t = x.hexdigest();
        }
      }
    }
  ),
  /***/
  814: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        cleanupTextLayer: () => (
          /* binding */
          r
        ),
        /* harmony export */
        renderTextLayer: () => (
          /* binding */
          t
        ),
        /* harmony export */
        updateTextLayer: () => (
          /* binding */
          i
        )
        /* harmony export */
      });
      var y = V(292), B = V(419);
      const N = 1e5, U = 30, L = 0.8, C = /* @__PURE__ */ new Map();
      let x = null;
      function A() {
        if (!x) {
          const h = document.createElement("canvas");
          h.className = "hiddenCanvasElement", document.body.append(h), x = h.getContext("2d", {
            alpha: !1
          });
        }
        return x;
      }
      function r() {
        x?.canvas.remove(), x = null;
      }
      function d(h) {
        const f = C.get(h);
        if (f)
          return f;
        const w = A(), S = w.font;
        w.canvas.width = w.canvas.height = U, w.font = `${U}px ${h}`;
        const P = w.measureText("");
        let M = P.fontBoundingBoxAscent, O = Math.abs(P.fontBoundingBoxDescent);
        if (M) {
          const z = M / (M + O);
          return C.set(h, z), w.canvas.width = w.canvas.height = 0, w.font = S, z;
        }
        w.strokeStyle = "red", w.clearRect(0, 0, U, U), w.strokeText("g", 0, 0);
        let _ = w.getImageData(0, 0, U, U).data;
        O = 0;
        for (let z = _.length - 1 - 3; z >= 0; z -= 4)
          if (_[z] > 0) {
            O = Math.ceil(z / 4 / U);
            break;
          }
        w.clearRect(0, 0, U, U), w.strokeText("A", 0, U), _ = w.getImageData(0, 0, U, U).data, M = 0;
        for (let z = 0, K = _.length; z < K; z += 4)
          if (_[z] > 0) {
            M = U - Math.floor(z / 4 / U);
            break;
          }
        if (w.canvas.width = w.canvas.height = 0, w.font = S, M) {
          const z = M / (M + O);
          return C.set(h, z), z;
        }
        return C.set(h, L), L;
      }
      function c(h, f, w) {
        const S = document.createElement("span"), P = {
          angle: 0,
          canvasWidth: 0,
          hasText: f.str !== "",
          hasEOL: f.hasEOL,
          fontSize: 0
        };
        h._textDivs.push(S);
        const M = y.Util.transform(h._transform, f.transform);
        let O = Math.atan2(M[1], M[0]);
        const _ = w[f.fontName];
        _.vertical && (O += Math.PI / 2);
        const z = h._fontInspectorEnabled && _.fontSubstitution || _.fontFamily, K = Math.hypot(M[2], M[3]), nt = K * d(z);
        let j, H;
        O === 0 ? (j = M[4], H = M[5] - nt) : (j = M[4] + nt * Math.sin(O), H = M[5] - nt * Math.cos(O));
        const G = "calc(var(--scale-factor)*", Y = S.style;
        h._container === h._rootContainer ? (Y.left = `${(100 * j / h._pageWidth).toFixed(2)}%`, Y.top = `${(100 * H / h._pageHeight).toFixed(2)}%`) : (Y.left = `${G}${j.toFixed(2)}px)`, Y.top = `${G}${H.toFixed(2)}px)`), Y.fontSize = `${G}${K.toFixed(2)}px)`, Y.fontFamily = z, P.fontSize = K, S.setAttribute("role", "presentation"), S.textContent = f.str, S.dir = f.dir, h._fontInspectorEnabled && (S.dataset.fontName = _.fontSubstitutionLoadedName || f.fontName), O !== 0 && (P.angle = O * (180 / Math.PI));
        let et = !1;
        if (f.str.length > 1)
          et = !0;
        else if (f.str !== " " && f.transform[0] !== f.transform[3]) {
          const tt = Math.abs(f.transform[0]), ot = Math.abs(f.transform[3]);
          tt !== ot && Math.max(tt, ot) / Math.min(tt, ot) > 1.5 && (et = !0);
        }
        et && (P.canvasWidth = _.vertical ? f.height : f.width), h._textDivProperties.set(S, P), h._isReadableStream && h._layoutText(S);
      }
      function m(h) {
        const {
          div: f,
          scale: w,
          properties: S,
          ctx: P,
          prevFontSize: M,
          prevFontFamily: O
        } = h, {
          style: _
        } = f;
        let z = "";
        if (S.canvasWidth !== 0 && S.hasText) {
          const {
            fontFamily: K
          } = _, {
            canvasWidth: nt,
            fontSize: j
          } = S;
          (M !== j || O !== K) && (P.font = `${j * w}px ${K}`, h.prevFontSize = j, h.prevFontFamily = K);
          const {
            width: H
          } = P.measureText(f.textContent);
          H > 0 && (z = `scaleX(${nt * w / H})`);
        }
        S.angle !== 0 && (z = `rotate(${S.angle}deg) ${z}`), z.length > 0 && (_.transform = z);
      }
      function s(h) {
        if (h._canceled)
          return;
        const f = h._textDivs, w = h._capability;
        if (f.length > N) {
          w.resolve();
          return;
        }
        if (!h._isReadableStream)
          for (const P of f)
            h._layoutText(P);
        w.resolve();
      }
      class g {
        constructor({
          textContentSource: f,
          container: w,
          viewport: S,
          textDivs: P,
          textDivProperties: M,
          textContentItemsStr: O
        }) {
          this._textContentSource = f, this._isReadableStream = f instanceof ReadableStream, this._container = this._rootContainer = w, this._textDivs = P || [], this._textContentItemsStr = O || [], this._fontInspectorEnabled = !!globalThis.FontInspector?.enabled, this._reader = null, this._textDivProperties = M || /* @__PURE__ */ new WeakMap(), this._canceled = !1, this._capability = Promise.withResolvers(), this._layoutTextParams = {
            prevFontSize: null,
            prevFontFamily: null,
            div: null,
            scale: S.scale * (globalThis.devicePixelRatio || 1),
            properties: null,
            ctx: A()
          };
          const {
            pageWidth: _,
            pageHeight: z,
            pageX: K,
            pageY: nt
          } = S.rawDims;
          this._transform = [1, 0, 0, -1, -K, nt + z], this._pageWidth = _, this._pageHeight = z, (0, B.setLayerDimensions)(w, S), this._capability.promise.finally(() => {
            this._layoutTextParams = null;
          }).catch(() => {
          });
        }
        get promise() {
          return this._capability.promise;
        }
        cancel() {
          this._canceled = !0, this._reader && (this._reader.cancel(new y.AbortException("TextLayer task cancelled.")).catch(() => {
          }), this._reader = null), this._capability.reject(new y.AbortException("TextLayer task cancelled."));
        }
        _processItems(f, w) {
          for (const S of f) {
            if (S.str === void 0) {
              if (S.type === "beginMarkedContentProps" || S.type === "beginMarkedContent") {
                const P = this._container;
                this._container = document.createElement("span"), this._container.classList.add("markedContent"), S.id !== null && this._container.setAttribute("id", `${S.id}`), P.append(this._container);
              } else S.type === "endMarkedContent" && (this._container = this._container.parentNode);
              continue;
            }
            this._textContentItemsStr.push(S.str), c(this, S, w);
          }
        }
        _layoutText(f) {
          const w = this._layoutTextParams.properties = this._textDivProperties.get(f);
          if (this._layoutTextParams.div = f, m(this._layoutTextParams), w.hasText && this._container.append(f), w.hasEOL) {
            const S = document.createElement("br");
            S.setAttribute("role", "presentation"), this._container.append(S);
          }
        }
        _render() {
          const {
            promise: f,
            resolve: w,
            reject: S
          } = Promise.withResolvers();
          let P = /* @__PURE__ */ Object.create(null);
          if (this._isReadableStream) {
            const M = () => {
              this._reader.read().then(({
                value: O,
                done: _
              }) => {
                if (_) {
                  w();
                  return;
                }
                Object.assign(P, O.styles), this._processItems(O.items, P), M();
              }, S);
            };
            this._reader = this._textContentSource.getReader(), M();
          } else if (this._textContentSource) {
            const {
              items: M,
              styles: O
            } = this._textContentSource;
            this._processItems(M, O), w();
          } else
            throw new Error('No "textContentSource" parameter specified.');
          f.then(() => {
            P = null, s(this);
          }, this._capability.reject);
        }
      }
      function t(h) {
        const f = new g(h);
        return f._render(), f;
      }
      function i({
        container: h,
        viewport: f,
        textDivs: w,
        textDivProperties: S,
        mustRotate: P = !0,
        mustRescale: M = !0
      }) {
        if (P && (0, B.setLayerDimensions)(h, {
          rotation: f.rotation
        }), M) {
          const O = A(), z = {
            prevFontSize: null,
            prevFontFamily: null,
            div: null,
            scale: f.scale * (globalThis.devicePixelRatio || 1),
            properties: null,
            ctx: O
          };
          for (const K of w)
            z.properties = S.get(K), z.div = K, m(z);
        }
      }
    }
  ),
  /***/
  585: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        PDFDataTransportStream: () => (
          /* binding */
          N
        )
        /* harmony export */
      });
      var y = V(292), B = V(419);
      class N {
        constructor(x, {
          disableRange: A = !1,
          disableStream: r = !1
        }) {
          (0, y.assert)(x, 'PDFDataTransportStream - missing required "pdfDataRangeTransport" argument.');
          const {
            length: d,
            initialData: c,
            progressiveDone: m,
            contentDispositionFilename: s
          } = x;
          if (this._queuedChunks = [], this._progressiveDone = m, this._contentDispositionFilename = s, c?.length > 0) {
            const g = c instanceof Uint8Array && c.byteLength === c.buffer.byteLength ? c.buffer : new Uint8Array(c).buffer;
            this._queuedChunks.push(g);
          }
          this._pdfDataRangeTransport = x, this._isStreamingSupported = !r, this._isRangeSupported = !A, this._contentLength = d, this._fullRequestReader = null, this._rangeReaders = [], x.addRangeListener((g, t) => {
            this._onReceiveData({
              begin: g,
              chunk: t
            });
          }), x.addProgressListener((g, t) => {
            this._onProgress({
              loaded: g,
              total: t
            });
          }), x.addProgressiveReadListener((g) => {
            this._onReceiveData({
              chunk: g
            });
          }), x.addProgressiveDoneListener(() => {
            this._onProgressiveDone();
          }), x.transportReady();
        }
        _onReceiveData({
          begin: x,
          chunk: A
        }) {
          const r = A instanceof Uint8Array && A.byteLength === A.buffer.byteLength ? A.buffer : new Uint8Array(A).buffer;
          if (x === void 0)
            this._fullRequestReader ? this._fullRequestReader._enqueue(r) : this._queuedChunks.push(r);
          else {
            const d = this._rangeReaders.some(function(c) {
              return c._begin !== x ? !1 : (c._enqueue(r), !0);
            });
            (0, y.assert)(d, "_onReceiveData - no `PDFDataTransportStreamRangeReader` instance found.");
          }
        }
        get _progressiveDataLength() {
          return this._fullRequestReader?._loaded ?? 0;
        }
        _onProgress(x) {
          x.total === void 0 ? this._rangeReaders[0]?.onProgress?.({
            loaded: x.loaded
          }) : this._fullRequestReader?.onProgress?.({
            loaded: x.loaded,
            total: x.total
          });
        }
        _onProgressiveDone() {
          this._fullRequestReader?.progressiveDone(), this._progressiveDone = !0;
        }
        _removeRangeReader(x) {
          const A = this._rangeReaders.indexOf(x);
          A >= 0 && this._rangeReaders.splice(A, 1);
        }
        getFullReader() {
          (0, y.assert)(!this._fullRequestReader, "PDFDataTransportStream.getFullReader can only be called once.");
          const x = this._queuedChunks;
          return this._queuedChunks = null, new U(this, x, this._progressiveDone, this._contentDispositionFilename);
        }
        getRangeReader(x, A) {
          if (A <= this._progressiveDataLength)
            return null;
          const r = new L(this, x, A);
          return this._pdfDataRangeTransport.requestDataRange(x, A), this._rangeReaders.push(r), r;
        }
        cancelAllRequests(x) {
          this._fullRequestReader?.cancel(x);
          for (const A of this._rangeReaders.slice(0))
            A.cancel(x);
          this._pdfDataRangeTransport.abort();
        }
      }
      class U {
        constructor(x, A, r = !1, d = null) {
          this._stream = x, this._done = r || !1, this._filename = (0, B.isPdfFile)(d) ? d : null, this._queuedChunks = A || [], this._loaded = 0;
          for (const c of this._queuedChunks)
            this._loaded += c.byteLength;
          this._requests = [], this._headersReady = Promise.resolve(), x._fullRequestReader = this, this.onProgress = null;
        }
        _enqueue(x) {
          this._done || (this._requests.length > 0 ? this._requests.shift().resolve({
            value: x,
            done: !1
          }) : this._queuedChunks.push(x), this._loaded += x.byteLength);
        }
        get headersReady() {
          return this._headersReady;
        }
        get filename() {
          return this._filename;
        }
        get isRangeSupported() {
          return this._stream._isRangeSupported;
        }
        get isStreamingSupported() {
          return this._stream._isStreamingSupported;
        }
        get contentLength() {
          return this._stream._contentLength;
        }
        async read() {
          if (this._queuedChunks.length > 0)
            return {
              value: this._queuedChunks.shift(),
              done: !1
            };
          if (this._done)
            return {
              value: void 0,
              done: !0
            };
          const x = Promise.withResolvers();
          return this._requests.push(x), x.promise;
        }
        cancel(x) {
          this._done = !0;
          for (const A of this._requests)
            A.resolve({
              value: void 0,
              done: !0
            });
          this._requests.length = 0;
        }
        progressiveDone() {
          this._done || (this._done = !0);
        }
      }
      class L {
        constructor(x, A, r) {
          this._stream = x, this._begin = A, this._end = r, this._queuedChunk = null, this._requests = [], this._done = !1, this.onProgress = null;
        }
        _enqueue(x) {
          if (!this._done) {
            if (this._requests.length === 0)
              this._queuedChunk = x;
            else {
              this._requests.shift().resolve({
                value: x,
                done: !1
              });
              for (const r of this._requests)
                r.resolve({
                  value: void 0,
                  done: !0
                });
              this._requests.length = 0;
            }
            this._done = !0, this._stream._removeRangeReader(this);
          }
        }
        get isStreamingSupported() {
          return !1;
        }
        async read() {
          if (this._queuedChunk) {
            const A = this._queuedChunk;
            return this._queuedChunk = null, {
              value: A,
              done: !1
            };
          }
          if (this._done)
            return {
              value: void 0,
              done: !0
            };
          const x = Promise.withResolvers();
          return this._requests.push(x), x.promise;
        }
        cancel(x) {
          this._done = !0;
          for (const A of this._requests)
            A.resolve({
              value: void 0,
              done: !0
            });
          this._requests.length = 0, this._stream._removeRangeReader(this);
        }
      }
    }
  ),
  /***/
  164: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        GlobalWorkerOptions: () => (
          /* binding */
          y
        )
        /* harmony export */
      });
      class y {
        static #t = null;
        static #e = "";
        static get workerPort() {
          return this.#t;
        }
        static set workerPort(N) {
          if (!(typeof Worker < "u" && N instanceof Worker) && N !== null)
            throw new Error("Invalid `workerPort` type.");
          this.#t = N;
        }
        static get workerSrc() {
          return this.#e;
        }
        static set workerSrc(N) {
          if (typeof N != "string")
            throw new Error("Invalid `workerSrc` type.");
          this.#e = N;
        }
      }
    }
  ),
  /***/
  284: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        XfaLayer: () => (
          /* binding */
          B
        )
        /* harmony export */
      });
      var y = V(50);
      class B {
        static setupStorage(U, L, C, x, A) {
          const r = x.getValue(L, {
            value: null
          });
          switch (C.name) {
            case "textarea":
              if (r.value !== null && (U.textContent = r.value), A === "print")
                break;
              U.addEventListener("input", (d) => {
                x.setValue(L, {
                  value: d.target.value
                });
              });
              break;
            case "input":
              if (C.attributes.type === "radio" || C.attributes.type === "checkbox") {
                if (r.value === C.attributes.xfaOn ? U.setAttribute("checked", !0) : r.value === C.attributes.xfaOff && U.removeAttribute("checked"), A === "print")
                  break;
                U.addEventListener("change", (d) => {
                  x.setValue(L, {
                    value: d.target.checked ? d.target.getAttribute("xfaOn") : d.target.getAttribute("xfaOff")
                  });
                });
              } else {
                if (r.value !== null && U.setAttribute("value", r.value), A === "print")
                  break;
                U.addEventListener("input", (d) => {
                  x.setValue(L, {
                    value: d.target.value
                  });
                });
              }
              break;
            case "select":
              if (r.value !== null) {
                U.setAttribute("value", r.value);
                for (const d of C.children)
                  d.attributes.value === r.value ? d.attributes.selected = !0 : d.attributes.hasOwnProperty("selected") && delete d.attributes.selected;
              }
              U.addEventListener("input", (d) => {
                const c = d.target.options, m = c.selectedIndex === -1 ? "" : c[c.selectedIndex].value;
                x.setValue(L, {
                  value: m
                });
              });
              break;
          }
        }
        static setAttributes({
          html: U,
          element: L,
          storage: C = null,
          intent: x,
          linkService: A
        }) {
          const {
            attributes: r
          } = L, d = U instanceof HTMLAnchorElement;
          r.type === "radio" && (r.name = `${r.name}-${x}`);
          for (const [c, m] of Object.entries(r))
            if (m != null)
              switch (c) {
                case "class":
                  m.length && U.setAttribute(c, m.join(" "));
                  break;
                case "dataId":
                  break;
                case "id":
                  U.setAttribute("data-element-id", m);
                  break;
                case "style":
                  Object.assign(U.style, m);
                  break;
                case "textContent":
                  U.textContent = m;
                  break;
                default:
                  (!d || c !== "href" && c !== "newWindow") && U.setAttribute(c, m);
              }
          d && A.addLinkAttributes(U, r.href, r.newWindow), C && r.dataId && this.setupStorage(U, r.dataId, L, C);
        }
        static render(U) {
          const L = U.annotationStorage, C = U.linkService, x = U.xfaHtml, A = U.intent || "display", r = document.createElement(x.name);
          x.attributes && this.setAttributes({
            html: r,
            element: x,
            intent: A,
            linkService: C
          });
          const d = A !== "richText", c = U.div;
          if (c.append(r), U.viewport) {
            const g = `matrix(${U.viewport.transform.join(",")})`;
            c.style.transform = g;
          }
          d && c.setAttribute("class", "xfaLayer xfaFont");
          const m = [];
          if (x.children.length === 0) {
            if (x.value) {
              const g = document.createTextNode(x.value);
              r.append(g), d && y.XfaText.shouldBuildText(x.name) && m.push(g);
            }
            return {
              textDivs: m
            };
          }
          const s = [[x, -1, r]];
          for (; s.length > 0; ) {
            const [g, t, i] = s.at(-1);
            if (t + 1 === g.children.length) {
              s.pop();
              continue;
            }
            const h = g.children[++s.at(-1)[1]];
            if (h === null)
              continue;
            const {
              name: f
            } = h;
            if (f === "#text") {
              const S = document.createTextNode(h.value);
              m.push(S), i.append(S);
              continue;
            }
            const w = h?.attributes?.xmlns ? document.createElementNS(h.attributes.xmlns, f) : document.createElement(f);
            if (i.append(w), h.attributes && this.setAttributes({
              html: w,
              element: h,
              storage: L,
              intent: A,
              linkService: C
            }), h.children?.length > 0)
              s.push([h, -1, w]);
            else if (h.value) {
              const S = document.createTextNode(h.value);
              d && y.XfaText.shouldBuildText(f) && m.push(S), w.append(S);
            }
          }
          for (const g of c.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea"))
            g.setAttribute("readOnly", !0);
          return {
            textDivs: m
          };
        }
        static update(U) {
          const L = `matrix(${U.viewport.transform.join(",")})`;
          U.div.style.transform = L, U.div.hidden = !1;
        }
      }
    }
  ),
  /***/
  50: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        XfaText: () => (
          /* binding */
          y
        )
        /* harmony export */
      });
      class y {
        static textContent(N) {
          const U = [], L = {
            items: U,
            styles: /* @__PURE__ */ Object.create(null)
          };
          function C(x) {
            if (!x)
              return;
            let A = null;
            const r = x.name;
            if (r === "#text")
              A = x.value;
            else if (y.shouldBuildText(r))
              x?.attributes?.textContent ? A = x.attributes.textContent : x.value && (A = x.value);
            else return;
            if (A !== null && U.push({
              str: A
            }), !!x.children)
              for (const d of x.children)
                C(d);
          }
          return C(N), L;
        }
        static shouldBuildText(N) {
          return !(N === "textarea" || N === "input" || N === "option" || N === "select");
        }
      }
    }
  ),
  /***/
  228: (
    /***/
    (at, W, V) => {
      V.a(at, async (y, B) => {
        try {
          V.d(W, {
            /* harmony export */
            AbortException: () => (
              /* reexport safe */
              N.AbortException
            ),
            /* harmony export */
            AnnotationEditorLayer: () => (
              /* reexport safe */
              x.AnnotationEditorLayer
            ),
            /* harmony export */
            AnnotationEditorParamsType: () => (
              /* reexport safe */
              N.AnnotationEditorParamsType
            ),
            /* harmony export */
            AnnotationEditorType: () => (
              /* reexport safe */
              N.AnnotationEditorType
            ),
            /* harmony export */
            AnnotationEditorUIManager: () => (
              /* reexport safe */
              A.AnnotationEditorUIManager
            ),
            /* harmony export */
            AnnotationLayer: () => (
              /* reexport safe */
              r.AnnotationLayer
            ),
            /* harmony export */
            AnnotationMode: () => (
              /* reexport safe */
              N.AnnotationMode
            ),
            /* harmony export */
            CMapCompressionType: () => (
              /* reexport safe */
              N.CMapCompressionType
            ),
            /* harmony export */
            ColorPicker: () => (
              /* reexport safe */
              d.ColorPicker
            ),
            /* harmony export */
            DOMSVGFactory: () => (
              /* reexport safe */
              L.DOMSVGFactory
            ),
            /* harmony export */
            DrawLayer: () => (
              /* reexport safe */
              c.DrawLayer
            ),
            /* harmony export */
            FeatureTest: () => (
              /* reexport safe */
              N.FeatureTest
            ),
            /* harmony export */
            GlobalWorkerOptions: () => (
              /* reexport safe */
              m.GlobalWorkerOptions
            ),
            /* harmony export */
            ImageKind: () => (
              /* reexport safe */
              N.ImageKind
            ),
            /* harmony export */
            InvalidPDFException: () => (
              /* reexport safe */
              N.InvalidPDFException
            ),
            /* harmony export */
            MissingPDFException: () => (
              /* reexport safe */
              N.MissingPDFException
            ),
            /* harmony export */
            OPS: () => (
              /* reexport safe */
              N.OPS
            ),
            /* harmony export */
            Outliner: () => (
              /* reexport safe */
              s.Outliner
            ),
            /* harmony export */
            PDFDataRangeTransport: () => (
              /* reexport safe */
              U.PDFDataRangeTransport
            ),
            /* harmony export */
            PDFDateString: () => (
              /* reexport safe */
              L.PDFDateString
            ),
            /* harmony export */
            PDFWorker: () => (
              /* reexport safe */
              U.PDFWorker
            ),
            /* harmony export */
            PasswordResponses: () => (
              /* reexport safe */
              N.PasswordResponses
            ),
            /* harmony export */
            PermissionFlag: () => (
              /* reexport safe */
              N.PermissionFlag
            ),
            /* harmony export */
            PixelsPerInch: () => (
              /* reexport safe */
              L.PixelsPerInch
            ),
            /* harmony export */
            RenderingCancelledException: () => (
              /* reexport safe */
              L.RenderingCancelledException
            ),
            /* harmony export */
            UnexpectedResponseException: () => (
              /* reexport safe */
              N.UnexpectedResponseException
            ),
            /* harmony export */
            Util: () => (
              /* reexport safe */
              N.Util
            ),
            /* harmony export */
            VerbosityLevel: () => (
              /* reexport safe */
              N.VerbosityLevel
            ),
            /* harmony export */
            XfaLayer: () => (
              /* reexport safe */
              g.XfaLayer
            ),
            /* harmony export */
            build: () => (
              /* reexport safe */
              U.build
            ),
            /* harmony export */
            createValidAbsoluteUrl: () => (
              /* reexport safe */
              N.createValidAbsoluteUrl
            ),
            /* harmony export */
            fetchData: () => (
              /* reexport safe */
              L.fetchData
            ),
            /* harmony export */
            getDocument: () => (
              /* reexport safe */
              U.getDocument
            ),
            /* harmony export */
            getFilenameFromUrl: () => (
              /* reexport safe */
              L.getFilenameFromUrl
            ),
            /* harmony export */
            getPdfFilenameFromUrl: () => (
              /* reexport safe */
              L.getPdfFilenameFromUrl
            ),
            /* harmony export */
            getXfaPageViewport: () => (
              /* reexport safe */
              L.getXfaPageViewport
            ),
            /* harmony export */
            isDataScheme: () => (
              /* reexport safe */
              L.isDataScheme
            ),
            /* harmony export */
            isPdfFile: () => (
              /* reexport safe */
              L.isPdfFile
            ),
            /* harmony export */
            noContextMenu: () => (
              /* reexport safe */
              L.noContextMenu
            ),
            /* harmony export */
            normalizeUnicode: () => (
              /* reexport safe */
              N.normalizeUnicode
            ),
            /* harmony export */
            renderTextLayer: () => (
              /* reexport safe */
              C.renderTextLayer
            ),
            /* harmony export */
            setLayerDimensions: () => (
              /* reexport safe */
              L.setLayerDimensions
            ),
            /* harmony export */
            shadow: () => (
              /* reexport safe */
              N.shadow
            ),
            /* harmony export */
            updateTextLayer: () => (
              /* reexport safe */
              C.updateTextLayer
            ),
            /* harmony export */
            version: () => (
              /* reexport safe */
              U.version
            )
            /* harmony export */
          });
          var N = V(292), U = V(831), L = V(419), C = V(814), x = V(731), A = V(830), r = V(976), d = V(259), c = V(47), m = V(164), s = V(61), g = V(284), t = y([U]);
          U = (t.then ? (await t)() : t)[0];
          const i = "4.2.67", h = "49b388101";
          B();
        } catch (i) {
          B(i);
        }
      });
    }
  ),
  /***/
  178: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        MessageHandler: () => (
          /* binding */
          L
        )
        /* harmony export */
      });
      var y = V(292);
      const B = {
        UNKNOWN: 0,
        DATA: 1,
        ERROR: 2
      }, N = {
        UNKNOWN: 0,
        CANCEL: 1,
        CANCEL_COMPLETE: 2,
        CLOSE: 3,
        ENQUEUE: 4,
        ERROR: 5,
        PULL: 6,
        PULL_COMPLETE: 7,
        START_COMPLETE: 8
      };
      function U(C) {
        switch (C instanceof Error || typeof C == "object" && C !== null || (0, y.unreachable)('wrapReason: Expected "reason" to be a (possibly cloned) Error.'), C.name) {
          case "AbortException":
            return new y.AbortException(C.message);
          case "MissingPDFException":
            return new y.MissingPDFException(C.message);
          case "PasswordException":
            return new y.PasswordException(C.message, C.code);
          case "UnexpectedResponseException":
            return new y.UnexpectedResponseException(C.message, C.status);
          case "UnknownErrorException":
            return new y.UnknownErrorException(C.message, C.details);
          default:
            return new y.UnknownErrorException(C.message, C.toString());
        }
      }
      class L {
        constructor(x, A, r) {
          this.sourceName = x, this.targetName = A, this.comObj = r, this.callbackId = 1, this.streamId = 1, this.streamSinks = /* @__PURE__ */ Object.create(null), this.streamControllers = /* @__PURE__ */ Object.create(null), this.callbackCapabilities = /* @__PURE__ */ Object.create(null), this.actionHandler = /* @__PURE__ */ Object.create(null), this._onComObjOnMessage = (d) => {
            const c = d.data;
            if (c.targetName !== this.sourceName)
              return;
            if (c.stream) {
              this.#e(c);
              return;
            }
            if (c.callback) {
              const s = c.callbackId, g = this.callbackCapabilities[s];
              if (!g)
                throw new Error(`Cannot resolve callback ${s}`);
              if (delete this.callbackCapabilities[s], c.callback === B.DATA)
                g.resolve(c.data);
              else if (c.callback === B.ERROR)
                g.reject(U(c.reason));
              else
                throw new Error("Unexpected callback case");
              return;
            }
            const m = this.actionHandler[c.action];
            if (!m)
              throw new Error(`Unknown action from worker: ${c.action}`);
            if (c.callbackId) {
              const s = this.sourceName, g = c.sourceName;
              new Promise(function(t) {
                t(m(c.data));
              }).then(function(t) {
                r.postMessage({
                  sourceName: s,
                  targetName: g,
                  callback: B.DATA,
                  callbackId: c.callbackId,
                  data: t
                });
              }, function(t) {
                r.postMessage({
                  sourceName: s,
                  targetName: g,
                  callback: B.ERROR,
                  callbackId: c.callbackId,
                  reason: U(t)
                });
              });
              return;
            }
            if (c.streamId) {
              this.#t(c);
              return;
            }
            m(c.data);
          }, r.addEventListener("message", this._onComObjOnMessage);
        }
        on(x, A) {
          const r = this.actionHandler;
          if (r[x])
            throw new Error(`There is already an actionName called "${x}"`);
          r[x] = A;
        }
        send(x, A, r) {
          this.comObj.postMessage({
            sourceName: this.sourceName,
            targetName: this.targetName,
            action: x,
            data: A
          }, r);
        }
        sendWithPromise(x, A, r) {
          const d = this.callbackId++, c = Promise.withResolvers();
          this.callbackCapabilities[d] = c;
          try {
            this.comObj.postMessage({
              sourceName: this.sourceName,
              targetName: this.targetName,
              action: x,
              callbackId: d,
              data: A
            }, r);
          } catch (m) {
            c.reject(m);
          }
          return c.promise;
        }
        sendWithStream(x, A, r, d) {
          const c = this.streamId++, m = this.sourceName, s = this.targetName, g = this.comObj;
          return new ReadableStream({
            start: (t) => {
              const i = Promise.withResolvers();
              return this.streamControllers[c] = {
                controller: t,
                startCall: i,
                pullCall: null,
                cancelCall: null,
                isClosed: !1
              }, g.postMessage({
                sourceName: m,
                targetName: s,
                action: x,
                streamId: c,
                data: A,
                desiredSize: t.desiredSize
              }, d), i.promise;
            },
            pull: (t) => {
              const i = Promise.withResolvers();
              return this.streamControllers[c].pullCall = i, g.postMessage({
                sourceName: m,
                targetName: s,
                stream: N.PULL,
                streamId: c,
                desiredSize: t.desiredSize
              }), i.promise;
            },
            cancel: (t) => {
              (0, y.assert)(t instanceof Error, "cancel must have a valid reason");
              const i = Promise.withResolvers();
              return this.streamControllers[c].cancelCall = i, this.streamControllers[c].isClosed = !0, g.postMessage({
                sourceName: m,
                targetName: s,
                stream: N.CANCEL,
                streamId: c,
                reason: U(t)
              }), i.promise;
            }
          }, r);
        }
        #t(x) {
          const A = x.streamId, r = this.sourceName, d = x.sourceName, c = this.comObj, m = this, s = this.actionHandler[x.action], g = {
            enqueue(t, i = 1, h) {
              if (this.isCancelled)
                return;
              const f = this.desiredSize;
              this.desiredSize -= i, f > 0 && this.desiredSize <= 0 && (this.sinkCapability = Promise.withResolvers(), this.ready = this.sinkCapability.promise), c.postMessage({
                sourceName: r,
                targetName: d,
                stream: N.ENQUEUE,
                streamId: A,
                chunk: t
              }, h);
            },
            close() {
              this.isCancelled || (this.isCancelled = !0, c.postMessage({
                sourceName: r,
                targetName: d,
                stream: N.CLOSE,
                streamId: A
              }), delete m.streamSinks[A]);
            },
            error(t) {
              (0, y.assert)(t instanceof Error, "error must have a valid reason"), !this.isCancelled && (this.isCancelled = !0, c.postMessage({
                sourceName: r,
                targetName: d,
                stream: N.ERROR,
                streamId: A,
                reason: U(t)
              }));
            },
            sinkCapability: Promise.withResolvers(),
            onPull: null,
            onCancel: null,
            isCancelled: !1,
            desiredSize: x.desiredSize,
            ready: null
          };
          g.sinkCapability.resolve(), g.ready = g.sinkCapability.promise, this.streamSinks[A] = g, new Promise(function(t) {
            t(s(x.data, g));
          }).then(function() {
            c.postMessage({
              sourceName: r,
              targetName: d,
              stream: N.START_COMPLETE,
              streamId: A,
              success: !0
            });
          }, function(t) {
            c.postMessage({
              sourceName: r,
              targetName: d,
              stream: N.START_COMPLETE,
              streamId: A,
              reason: U(t)
            });
          });
        }
        #e(x) {
          const A = x.streamId, r = this.sourceName, d = x.sourceName, c = this.comObj, m = this.streamControllers[A], s = this.streamSinks[A];
          switch (x.stream) {
            case N.START_COMPLETE:
              x.success ? m.startCall.resolve() : m.startCall.reject(U(x.reason));
              break;
            case N.PULL_COMPLETE:
              x.success ? m.pullCall.resolve() : m.pullCall.reject(U(x.reason));
              break;
            case N.PULL:
              if (!s) {
                c.postMessage({
                  sourceName: r,
                  targetName: d,
                  stream: N.PULL_COMPLETE,
                  streamId: A,
                  success: !0
                });
                break;
              }
              s.desiredSize <= 0 && x.desiredSize > 0 && s.sinkCapability.resolve(), s.desiredSize = x.desiredSize, new Promise(function(g) {
                g(s.onPull?.());
              }).then(function() {
                c.postMessage({
                  sourceName: r,
                  targetName: d,
                  stream: N.PULL_COMPLETE,
                  streamId: A,
                  success: !0
                });
              }, function(g) {
                c.postMessage({
                  sourceName: r,
                  targetName: d,
                  stream: N.PULL_COMPLETE,
                  streamId: A,
                  reason: U(g)
                });
              });
              break;
            case N.ENQUEUE:
              if ((0, y.assert)(m, "enqueue should have stream controller"), m.isClosed)
                break;
              m.controller.enqueue(x.chunk);
              break;
            case N.CLOSE:
              if ((0, y.assert)(m, "close should have stream controller"), m.isClosed)
                break;
              m.isClosed = !0, m.controller.close(), this.#s(m, A);
              break;
            case N.ERROR:
              (0, y.assert)(m, "error should have stream controller"), m.controller.error(U(x.reason)), this.#s(m, A);
              break;
            case N.CANCEL_COMPLETE:
              x.success ? m.cancelCall.resolve() : m.cancelCall.reject(U(x.reason)), this.#s(m, A);
              break;
            case N.CANCEL:
              if (!s)
                break;
              new Promise(function(g) {
                g(s.onCancel?.(U(x.reason)));
              }).then(function() {
                c.postMessage({
                  sourceName: r,
                  targetName: d,
                  stream: N.CANCEL_COMPLETE,
                  streamId: A,
                  success: !0
                });
              }, function(g) {
                c.postMessage({
                  sourceName: r,
                  targetName: d,
                  stream: N.CANCEL_COMPLETE,
                  streamId: A,
                  reason: U(g)
                });
              }), s.sinkCapability.reject(U(x.reason)), s.isCancelled = !0, delete this.streamSinks[A];
              break;
            default:
              throw new Error("Unexpected stream case");
          }
        }
        async #s(x, A) {
          await Promise.allSettled([x.startCall?.promise, x.pullCall?.promise, x.cancelCall?.promise]), delete this.streamControllers[A];
        }
        destroy() {
          this.comObj.removeEventListener("message", this._onComObjOnMessage);
        }
      }
    }
  ),
  /***/
  651: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        MurmurHash3_64: () => (
          /* binding */
          U
        )
        /* harmony export */
      });
      const y = 3285377520, B = 4294901760, N = 65535;
      class U {
        constructor(C) {
          this.h1 = C ? C & 4294967295 : y, this.h2 = C ? C & 4294967295 : y;
        }
        update(C) {
          let x, A;
          if (typeof C == "string") {
            x = new Uint8Array(C.length * 2), A = 0;
            for (let S = 0, P = C.length; S < P; S++) {
              const M = C.charCodeAt(S);
              M <= 255 ? x[A++] = M : (x[A++] = M >>> 8, x[A++] = M & 255);
            }
          } else if (ArrayBuffer.isView(C))
            x = C.slice(), A = x.byteLength;
          else
            throw new Error("Invalid data format, must be a string or TypedArray.");
          const r = A >> 2, d = A - r * 4, c = new Uint32Array(x.buffer, 0, r);
          let m = 0, s = 0, g = this.h1, t = this.h2;
          const i = 3432918353, h = 461845907, f = i & N, w = h & N;
          for (let S = 0; S < r; S++)
            S & 1 ? (m = c[S], m = m * i & B | m * f & N, m = m << 15 | m >>> 17, m = m * h & B | m * w & N, g ^= m, g = g << 13 | g >>> 19, g = g * 5 + 3864292196) : (s = c[S], s = s * i & B | s * f & N, s = s << 15 | s >>> 17, s = s * h & B | s * w & N, t ^= s, t = t << 13 | t >>> 19, t = t * 5 + 3864292196);
          switch (m = 0, d) {
            case 3:
              m ^= x[r * 4 + 2] << 16;
            case 2:
              m ^= x[r * 4 + 1] << 8;
            case 1:
              m ^= x[r * 4], m = m * i & B | m * f & N, m = m << 15 | m >>> 17, m = m * h & B | m * w & N, r & 1 ? g ^= m : t ^= m;
          }
          this.h1 = g, this.h2 = t;
        }
        hexdigest() {
          let C = this.h1, x = this.h2;
          return C ^= x >>> 1, C = C * 3981806797 & B | C * 36045 & N, x = x * 4283543511 & B | ((x << 16 | C >>> 16) * 2950163797 & B) >>> 16, C ^= x >>> 1, C = C * 444984403 & B | C * 60499 & N, x = x * 3301882366 & B | ((x << 16 | C >>> 16) * 3120437893 & B) >>> 16, C ^= x >>> 1, (C >>> 0).toString(16).padStart(8, "0") + (x >>> 0).toString(16).padStart(8, "0");
        }
      }
    }
  ),
  /***/
  292: (
    /***/
    (at, W, V) => {
      V.d(W, {
        /* harmony export */
        AbortException: () => (
          /* binding */
          dt
        ),
        /* harmony export */
        AnnotationBorderStyleType: () => (
          /* binding */
          t
        ),
        /* harmony export */
        AnnotationEditorParamsType: () => (
          /* binding */
          d
        ),
        /* harmony export */
        AnnotationEditorPrefix: () => (
          /* binding */
          A
        ),
        /* harmony export */
        AnnotationEditorType: () => (
          /* binding */
          r
        ),
        /* harmony export */
        AnnotationMode: () => (
          /* binding */
          x
        ),
        /* harmony export */
        AnnotationPrefix: () => (
          /* binding */
          k
        ),
        /* harmony export */
        AnnotationType: () => (
          /* binding */
          g
        ),
        /* harmony export */
        BaseException: () => (
          /* binding */
          G
        ),
        /* harmony export */
        CMapCompressionType: () => (
          /* binding */
          h
        ),
        /* harmony export */
        FONT_IDENTITY_MATRIX: () => (
          /* binding */
          N
        ),
        /* harmony export */
        FeatureTest: () => (
          /* binding */
          n
        ),
        /* harmony export */
        FontRenderOps: () => (
          /* binding */
          D
        ),
        /* harmony export */
        FormatError: () => (
          /* binding */
          pt
        ),
        /* harmony export */
        IDENTITY_MATRIX: () => (
          /* binding */
          B
        ),
        /* harmony export */
        ImageKind: () => (
          /* binding */
          s
        ),
        /* harmony export */
        InvalidPDFException: () => (
          /* binding */
          tt
        ),
        /* harmony export */
        LINE_FACTOR: () => (
          /* binding */
          L
        ),
        /* harmony export */
        MAX_IMAGE_SIZE_TO_CACHE: () => (
          /* binding */
          U
        ),
        /* harmony export */
        MissingPDFException: () => (
          /* binding */
          ot
        ),
        /* harmony export */
        OPS: () => (
          /* binding */
          f
        ),
        /* harmony export */
        PasswordException: () => (
          /* binding */
          Y
        ),
        /* harmony export */
        PasswordResponses: () => (
          /* binding */
          w
        ),
        /* harmony export */
        PermissionFlag: () => (
          /* binding */
          c
        ),
        /* harmony export */
        RenderingIntentFlag: () => (
          /* binding */
          C
        ),
        /* harmony export */
        TextRenderingMode: () => (
          /* binding */
          m
        ),
        /* harmony export */
        UnexpectedResponseException: () => (
          /* binding */
          ct
        ),
        /* harmony export */
        UnknownErrorException: () => (
          /* binding */
          et
        ),
        /* harmony export */
        Util: () => (
          /* binding */
          o
        ),
        /* harmony export */
        VerbosityLevel: () => (
          /* binding */
          i
        ),
        /* harmony export */
        assert: () => (
          /* binding */
          K
        ),
        /* harmony export */
        bytesToString: () => (
          /* binding */
          ht
        ),
        /* harmony export */
        createValidAbsoluteUrl: () => (
          /* binding */
          j
        ),
        /* harmony export */
        getUuid: () => (
          /* binding */
          R
        ),
        /* harmony export */
        getVerbosityLevel: () => (
          /* binding */
          M
        ),
        /* harmony export */
        info: () => (
          /* binding */
          O
        ),
        /* harmony export */
        isNodeJS: () => (
          /* binding */
          y
        ),
        /* harmony export */
        normalizeUnicode: () => (
          /* binding */
          E
        ),
        /* harmony export */
        objectFromMap: () => (
          /* binding */
          b
        ),
        /* harmony export */
        setVerbosityLevel: () => (
          /* binding */
          P
        ),
        /* harmony export */
        shadow: () => (
          /* binding */
          H
        ),
        /* harmony export */
        string32: () => (
          /* binding */
          st
        ),
        /* harmony export */
        stringToBytes: () => (
          /* binding */
          ut
        ),
        /* harmony export */
        unreachable: () => (
          /* binding */
          z
        ),
        /* harmony export */
        warn: () => (
          /* binding */
          _
        )
        /* harmony export */
      });
      const y = typeof process == "object" && process + "" == "[object process]" && !process.versions.nw && !(process.versions.electron && process.type && process.type !== "browser"), B = [1, 0, 0, 1, 0, 0], N = [1e-3, 0, 0, 1e-3, 0, 0], U = 1e7, L = 1.35, C = {
        ANY: 1,
        DISPLAY: 2,
        PRINT: 4,
        SAVE: 8,
        ANNOTATIONS_FORMS: 16,
        ANNOTATIONS_STORAGE: 32,
        ANNOTATIONS_DISABLE: 64,
        OPLIST: 256
      }, x = {
        DISABLE: 0,
        ENABLE: 1,
        ENABLE_FORMS: 2,
        ENABLE_STORAGE: 3
      }, A = "pdfjs_internal_editor_", r = {
        DISABLE: -1,
        NONE: 0,
        FREETEXT: 3,
        HIGHLIGHT: 9,
        STAMP: 13,
        INK: 15
      }, d = {
        RESIZE: 1,
        CREATE: 2,
        FREETEXT_SIZE: 11,
        FREETEXT_COLOR: 12,
        FREETEXT_OPACITY: 13,
        INK_COLOR: 21,
        INK_THICKNESS: 22,
        INK_OPACITY: 23,
        HIGHLIGHT_COLOR: 31,
        HIGHLIGHT_DEFAULT_COLOR: 32,
        HIGHLIGHT_THICKNESS: 33,
        HIGHLIGHT_FREE: 34,
        HIGHLIGHT_SHOW_ALL: 35
      }, c = {
        PRINT: 4,
        MODIFY_CONTENTS: 8,
        COPY: 16,
        MODIFY_ANNOTATIONS: 32,
        FILL_INTERACTIVE_FORMS: 256,
        COPY_FOR_ACCESSIBILITY: 512,
        ASSEMBLE: 1024,
        PRINT_HIGH_QUALITY: 2048
      }, m = {
        FILL: 0,
        STROKE: 1,
        FILL_STROKE: 2,
        INVISIBLE: 3,
        FILL_ADD_TO_PATH: 4,
        STROKE_ADD_TO_PATH: 5,
        FILL_STROKE_ADD_TO_PATH: 6,
        ADD_TO_PATH: 7,
        FILL_STROKE_MASK: 3,
        ADD_TO_PATH_FLAG: 4
      }, s = {
        GRAYSCALE_1BPP: 1,
        RGB_24BPP: 2,
        RGBA_32BPP: 3
      }, g = {
        TEXT: 1,
        LINK: 2,
        FREETEXT: 3,
        LINE: 4,
        SQUARE: 5,
        CIRCLE: 6,
        POLYGON: 7,
        POLYLINE: 8,
        HIGHLIGHT: 9,
        UNDERLINE: 10,
        SQUIGGLY: 11,
        STRIKEOUT: 12,
        STAMP: 13,
        CARET: 14,
        INK: 15,
        POPUP: 16,
        FILEATTACHMENT: 17,
        SOUND: 18,
        MOVIE: 19,
        WIDGET: 20,
        SCREEN: 21,
        PRINTERMARK: 22,
        TRAPNET: 23,
        WATERMARK: 24,
        THREED: 25,
        REDACT: 26
      }, t = {
        SOLID: 1,
        DASHED: 2,
        BEVELED: 3,
        INSET: 4,
        UNDERLINE: 5
      }, i = {
        ERRORS: 0,
        WARNINGS: 1,
        INFOS: 5
      }, h = {
        NONE: 0,
        BINARY: 1
      }, f = {
        dependency: 1,
        setLineWidth: 2,
        setLineCap: 3,
        setLineJoin: 4,
        setMiterLimit: 5,
        setDash: 6,
        setRenderingIntent: 7,
        setFlatness: 8,
        setGState: 9,
        save: 10,
        restore: 11,
        transform: 12,
        moveTo: 13,
        lineTo: 14,
        curveTo: 15,
        curveTo2: 16,
        curveTo3: 17,
        closePath: 18,
        rectangle: 19,
        stroke: 20,
        closeStroke: 21,
        fill: 22,
        eoFill: 23,
        fillStroke: 24,
        eoFillStroke: 25,
        closeFillStroke: 26,
        closeEOFillStroke: 27,
        endPath: 28,
        clip: 29,
        eoClip: 30,
        beginText: 31,
        endText: 32,
        setCharSpacing: 33,
        setWordSpacing: 34,
        setHScale: 35,
        setLeading: 36,
        setFont: 37,
        setTextRenderingMode: 38,
        setTextRise: 39,
        moveText: 40,
        setLeadingMoveText: 41,
        setTextMatrix: 42,
        nextLine: 43,
        showText: 44,
        showSpacedText: 45,
        nextLineShowText: 46,
        nextLineSetSpacingShowText: 47,
        setCharWidth: 48,
        setCharWidthAndBounds: 49,
        setStrokeColorSpace: 50,
        setFillColorSpace: 51,
        setStrokeColor: 52,
        setStrokeColorN: 53,
        setFillColor: 54,
        setFillColorN: 55,
        setStrokeGray: 56,
        setFillGray: 57,
        setStrokeRGBColor: 58,
        setFillRGBColor: 59,
        setStrokeCMYKColor: 60,
        setFillCMYKColor: 61,
        shadingFill: 62,
        beginInlineImage: 63,
        beginImageData: 64,
        endInlineImage: 65,
        paintXObject: 66,
        markPoint: 67,
        markPointProps: 68,
        beginMarkedContent: 69,
        beginMarkedContentProps: 70,
        endMarkedContent: 71,
        beginCompat: 72,
        endCompat: 73,
        paintFormXObjectBegin: 74,
        paintFormXObjectEnd: 75,
        beginGroup: 76,
        endGroup: 77,
        beginAnnotation: 80,
        endAnnotation: 81,
        paintImageMaskXObject: 83,
        paintImageMaskXObjectGroup: 84,
        paintImageXObject: 85,
        paintInlineImageXObject: 86,
        paintInlineImageXObjectGroup: 87,
        paintImageXObjectRepeat: 88,
        paintImageMaskXObjectRepeat: 89,
        paintSolidColorImageMask: 90,
        constructPath: 91
      }, w = {
        NEED_PASSWORD: 1,
        INCORRECT_PASSWORD: 2
      };
      let S = i.WARNINGS;
      function P(I) {
        Number.isInteger(I) && (S = I);
      }
      function M() {
        return S;
      }
      function O(I) {
        S >= i.INFOS && console.log(`Info: ${I}`);
      }
      function _(I) {
        S >= i.WARNINGS && console.log(`Warning: ${I}`);
      }
      function z(I) {
        throw new Error(I);
      }
      function K(I, F) {
        I || z(F);
      }
      function nt(I) {
        switch (I?.protocol) {
          case "http:":
          case "https:":
          case "ftp:":
          case "mailto:":
          case "tel:":
            return !0;
          default:
            return !1;
        }
      }
      function j(I, F = null, T = null) {
        if (!I)
          return null;
        try {
          if (T && typeof I == "string" && (T.addDefaultProtocol && I.startsWith("www.") && I.match(/\./g)?.length >= 2 && (I = `http://${I}`), T.tryConvertEncoding))
            try {
              I = a(I);
            } catch {
            }
          const X = F ? new URL(I, F) : new URL(I);
          if (nt(X))
            return X;
        } catch {
        }
        return null;
      }
      function H(I, F, T, X = !1) {
        return Object.defineProperty(I, F, {
          value: T,
          enumerable: !X,
          configurable: !0,
          writable: !1
        }), T;
      }
      const G = function() {
        function F(T, X) {
          this.constructor === F && z("Cannot initialize BaseException."), this.message = T, this.name = X;
        }
        return F.prototype = new Error(), F.constructor = F, F;
      }();
      class Y extends G {
        constructor(F, T) {
          super(F, "PasswordException"), this.code = T;
        }
      }
      class et extends G {
        constructor(F, T) {
          super(F, "UnknownErrorException"), this.details = T;
        }
      }
      class tt extends G {
        constructor(F) {
          super(F, "InvalidPDFException");
        }
      }
      class ot extends G {
        constructor(F) {
          super(F, "MissingPDFException");
        }
      }
      class ct extends G {
        constructor(F, T) {
          super(F, "UnexpectedResponseException"), this.status = T;
        }
      }
      class pt extends G {
        constructor(F) {
          super(F, "FormatError");
        }
      }
      class dt extends G {
        constructor(F) {
          super(F, "AbortException");
        }
      }
      function ht(I) {
        (typeof I != "object" || I?.length === void 0) && z("Invalid argument for bytesToString");
        const F = I.length, T = 8192;
        if (F < T)
          return String.fromCharCode.apply(null, I);
        const X = [];
        for (let Q = 0; Q < F; Q += T) {
          const $ = Math.min(Q + T, F), q = I.subarray(Q, $);
          X.push(String.fromCharCode.apply(null, q));
        }
        return X.join("");
      }
      function ut(I) {
        typeof I != "string" && z("Invalid argument for stringToBytes");
        const F = I.length, T = new Uint8Array(F);
        for (let X = 0; X < F; ++X)
          T[X] = I.charCodeAt(X) & 255;
        return T;
      }
      function st(I) {
        return String.fromCharCode(I >> 24 & 255, I >> 16 & 255, I >> 8 & 255, I & 255);
      }
      function b(I) {
        const F = /* @__PURE__ */ Object.create(null);
        for (const [T, X] of I)
          F[T] = X;
        return F;
      }
      function l() {
        const I = new Uint8Array(4);
        return I[0] = 1, new Uint32Array(I.buffer, 0, 1)[0] === 1;
      }
      function e() {
        try {
          return new Function(""), !0;
        } catch {
          return !1;
        }
      }
      class n {
        static get isLittleEndian() {
          return H(this, "isLittleEndian", l());
        }
        static get isEvalSupported() {
          return H(this, "isEvalSupported", e());
        }
        static get isOffscreenCanvasSupported() {
          return H(this, "isOffscreenCanvasSupported", typeof OffscreenCanvas < "u");
        }
        static get platform() {
          return typeof navigator < "u" && typeof navigator?.platform == "string" ? H(this, "platform", {
            isMac: navigator.platform.includes("Mac")
          }) : H(this, "platform", {
            isMac: !1
          });
        }
        static get isCSSRoundSupported() {
          return H(this, "isCSSRoundSupported", globalThis.CSS?.supports?.("width: round(1.5px, 1px)"));
        }
      }
      const p = Array.from(Array(256).keys(), (I) => I.toString(16).padStart(2, "0"));
      class o {
        static makeHexColor(F, T, X) {
          return `#${p[F]}${p[T]}${p[X]}`;
        }
        static scaleMinMax(F, T) {
          let X;
          F[0] ? (F[0] < 0 && (X = T[0], T[0] = T[2], T[2] = X), T[0] *= F[0], T[2] *= F[0], F[3] < 0 && (X = T[1], T[1] = T[3], T[3] = X), T[1] *= F[3], T[3] *= F[3]) : (X = T[0], T[0] = T[1], T[1] = X, X = T[2], T[2] = T[3], T[3] = X, F[1] < 0 && (X = T[1], T[1] = T[3], T[3] = X), T[1] *= F[1], T[3] *= F[1], F[2] < 0 && (X = T[0], T[0] = T[2], T[2] = X), T[0] *= F[2], T[2] *= F[2]), T[0] += F[4], T[1] += F[5], T[2] += F[4], T[3] += F[5];
        }
        static transform(F, T) {
          return [F[0] * T[0] + F[2] * T[1], F[1] * T[0] + F[3] * T[1], F[0] * T[2] + F[2] * T[3], F[1] * T[2] + F[3] * T[3], F[0] * T[4] + F[2] * T[5] + F[4], F[1] * T[4] + F[3] * T[5] + F[5]];
        }
        static applyTransform(F, T) {
          const X = F[0] * T[0] + F[1] * T[2] + T[4], Q = F[0] * T[1] + F[1] * T[3] + T[5];
          return [X, Q];
        }
        static applyInverseTransform(F, T) {
          const X = T[0] * T[3] - T[1] * T[2], Q = (F[0] * T[3] - F[1] * T[2] + T[2] * T[5] - T[4] * T[3]) / X, $ = (-F[0] * T[1] + F[1] * T[0] + T[4] * T[1] - T[5] * T[0]) / X;
          return [Q, $];
        }
        static getAxialAlignedBoundingBox(F, T) {
          const X = this.applyTransform(F, T), Q = this.applyTransform(F.slice(2, 4), T), $ = this.applyTransform([F[0], F[3]], T), q = this.applyTransform([F[2], F[1]], T);
          return [Math.min(X[0], Q[0], $[0], q[0]), Math.min(X[1], Q[1], $[1], q[1]), Math.max(X[0], Q[0], $[0], q[0]), Math.max(X[1], Q[1], $[1], q[1])];
        }
        static inverseTransform(F) {
          const T = F[0] * F[3] - F[1] * F[2];
          return [F[3] / T, -F[1] / T, -F[2] / T, F[0] / T, (F[2] * F[5] - F[4] * F[3]) / T, (F[4] * F[1] - F[5] * F[0]) / T];
        }
        static singularValueDecompose2dScale(F) {
          const T = [F[0], F[2], F[1], F[3]], X = F[0] * T[0] + F[1] * T[2], Q = F[0] * T[1] + F[1] * T[3], $ = F[2] * T[0] + F[3] * T[2], q = F[2] * T[1] + F[3] * T[3], rt = (X + q) / 2, Z = Math.sqrt((X + q) ** 2 - 4 * (X * q - $ * Q)) / 2, J = rt + Z || 1, it = rt - Z || 1;
          return [Math.sqrt(J), Math.sqrt(it)];
        }
        static normalizeRect(F) {
          const T = F.slice(0);
          return F[0] > F[2] && (T[0] = F[2], T[2] = F[0]), F[1] > F[3] && (T[1] = F[3], T[3] = F[1]), T;
        }
        static intersect(F, T) {
          const X = Math.max(Math.min(F[0], F[2]), Math.min(T[0], T[2])), Q = Math.min(Math.max(F[0], F[2]), Math.max(T[0], T[2]));
          if (X > Q)
            return null;
          const $ = Math.max(Math.min(F[1], F[3]), Math.min(T[1], T[3])), q = Math.min(Math.max(F[1], F[3]), Math.max(T[1], T[3]));
          return $ > q ? null : [X, $, Q, q];
        }
        static #t(F, T, X, Q, $, q, rt, Z, J, it) {
          if (J <= 0 || J >= 1)
            return;
          const lt = 1 - J, gt = J * J, bt = gt * J, At = lt * (lt * (lt * F + 3 * J * T) + 3 * gt * X) + bt * Q, mt = lt * (lt * (lt * $ + 3 * J * q) + 3 * gt * rt) + bt * Z;
          it[0] = Math.min(it[0], At), it[1] = Math.min(it[1], mt), it[2] = Math.max(it[2], At), it[3] = Math.max(it[3], mt);
        }
        static #e(F, T, X, Q, $, q, rt, Z, J, it, lt, gt) {
          if (Math.abs(J) < 1e-12) {
            Math.abs(it) >= 1e-12 && this.#t(F, T, X, Q, $, q, rt, Z, -lt / it, gt);
            return;
          }
          const bt = it ** 2 - 4 * lt * J;
          if (bt < 0)
            return;
          const At = Math.sqrt(bt), mt = 2 * J;
          this.#t(F, T, X, Q, $, q, rt, Z, (-it + At) / mt, gt), this.#t(F, T, X, Q, $, q, rt, Z, (-it - At) / mt, gt);
        }
        static bezierBoundingBox(F, T, X, Q, $, q, rt, Z, J) {
          return J ? (J[0] = Math.min(J[0], F, rt), J[1] = Math.min(J[1], T, Z), J[2] = Math.max(J[2], F, rt), J[3] = Math.max(J[3], T, Z)) : J = [Math.min(F, rt), Math.min(T, Z), Math.max(F, rt), Math.max(T, Z)], this.#e(F, X, $, rt, T, Q, q, Z, 3 * (-F + 3 * (X - $) + rt), 6 * (F - 2 * X + $), 3 * (X - F), J), this.#e(F, X, $, rt, T, Q, q, Z, 3 * (-T + 3 * (Q - q) + Z), 6 * (T - 2 * Q + q), 3 * (Q - T), J), J;
        }
      }
      function a(I) {
        return decodeURIComponent(escape(I));
      }
      let u = null, v = null;
      function E(I) {
        return u || (u = /([\u00a0\u00b5\u037e\u0eb3\u2000-\u200a\u202f\u2126\ufb00-\ufb04\ufb06\ufb20-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufba1\ufba4-\ufba9\ufbae-\ufbb1\ufbd3-\ufbdc\ufbde-\ufbe7\ufbea-\ufbf8\ufbfc-\ufbfd\ufc00-\ufc5d\ufc64-\ufcf1\ufcf5-\ufd3d\ufd88\ufdf4\ufdfa-\ufdfb\ufe71\ufe77\ufe79\ufe7b\ufe7d]+)|(\ufb05+)/gu, v = /* @__PURE__ */ new Map([["ﬅ", "ſt"]])), I.replaceAll(u, (F, T, X) => T ? T.normalize("NFKC") : v.get(X));
      }
      function R() {
        if (typeof crypto < "u" && typeof crypto?.randomUUID == "function")
          return crypto.randomUUID();
        const I = new Uint8Array(32);
        if (typeof crypto < "u" && typeof crypto?.getRandomValues == "function")
          crypto.getRandomValues(I);
        else
          for (let F = 0; F < 32; F++)
            I[F] = Math.floor(Math.random() * 255);
        return ht(I);
      }
      const k = "pdfjs_internal_id_", D = {
        BEZIER_CURVE_TO: 0,
        MOVE_TO: 1,
        LINE_TO: 2,
        QUADRATIC_CURVE_TO: 3,
        RESTORE: 4,
        SAVE: 5,
        SCALE: 6,
        TRANSFORM: 7,
        TRANSLATE: 8
      };
    }
  )
  /******/
}, Xt = {};
function Ft(at) {
  var W = Xt[at];
  if (W !== void 0)
    return W.exports;
  var V = Xt[at] = {
    /******/
    // no module.id needed
    /******/
    // no module.loaded needed
    /******/
    exports: {}
    /******/
  };
  return Kt[at](V, V.exports, Ft), V.exports;
}
(() => {
  var at = typeof Symbol == "function" ? Symbol("webpack queues") : "__webpack_queues__", W = typeof Symbol == "function" ? Symbol("webpack exports") : "__webpack_exports__", V = typeof Symbol == "function" ? Symbol("webpack error") : "__webpack_error__", y = (N) => {
    N && N.d < 1 && (N.d = 1, N.forEach((U) => U.r--), N.forEach((U) => U.r-- ? U.r++ : U()));
  }, B = (N) => N.map((U) => {
    if (U !== null && typeof U == "object") {
      if (U[at]) return U;
      if (U.then) {
        var L = [];
        L.d = 0, U.then((A) => {
          C[W] = A, y(L);
        }, (A) => {
          C[V] = A, y(L);
        });
        var C = {};
        return C[at] = (A) => A(L), C;
      }
    }
    var x = {};
    return x[at] = (A) => {
    }, x[W] = U, x;
  });
  Ft.a = (N, U, L) => {
    var C;
    L && ((C = []).d = -1);
    var x = /* @__PURE__ */ new Set(), A = N.exports, r, d, c, m = new Promise((s, g) => {
      c = g, d = s;
    });
    m[W] = A, m[at] = (s) => (C && s(C), x.forEach(s), m.catch((g) => {
    })), N.exports = m, U((s) => {
      r = B(s);
      var g, t = () => r.map((h) => {
        if (h[V]) throw h[V];
        return h[W];
      }), i = new Promise((h) => {
        g = () => h(t), g.r = 0;
        var f = (w) => w !== C && !x.has(w) && (x.add(w), w && !w.d && (g.r++, w.push(g)));
        r.map((w) => w[at](f));
      });
      return g.r ? i : t();
    }, (s) => (s ? c(m[V] = s) : d(A), y(C))), C && C.d < 0 && (C.d = 0);
  };
})();
Ft.d = (at, W) => {
  for (var V in W)
    Ft.o(W, V) && !Ft.o(at, V) && Object.defineProperty(at, V, { enumerable: !0, get: W[V] });
};
Ft.o = (at, W) => Object.prototype.hasOwnProperty.call(at, W);
var ft = Ft(228);
ft = globalThis.pdfjsLib = await (globalThis.pdfjsLibPromise = ft);
ft.AbortException;
ft.AnnotationEditorLayer;
ft.AnnotationEditorParamsType;
ft.AnnotationEditorType;
ft.AnnotationEditorUIManager;
ft.AnnotationLayer;
ft.AnnotationMode;
ft.CMapCompressionType;
ft.ColorPicker;
ft.DOMSVGFactory;
ft.DrawLayer;
ft.FeatureTest;
var Qt = ft.GlobalWorkerOptions;
ft.ImageKind;
ft.InvalidPDFException;
ft.MissingPDFException;
ft.OPS;
ft.Outliner;
ft.PDFDataRangeTransport;
ft.PDFDateString;
ft.PDFWorker;
ft.PasswordResponses;
ft.PermissionFlag;
ft.PixelsPerInch;
ft.RenderingCancelledException;
ft.UnexpectedResponseException;
ft.Util;
ft.VerbosityLevel;
ft.XfaLayer;
ft.build;
ft.createValidAbsoluteUrl;
ft.fetchData;
var Jt = ft.getDocument;
ft.getFilenameFromUrl;
ft.getPdfFilenameFromUrl;
ft.getXfaPageViewport;
ft.isDataScheme;
ft.isPdfFile;
ft.noContextMenu;
ft.normalizeUnicode;
ft.renderTextLayer;
ft.setLayerDimensions;
ft.shadow;
ft.updateTextLayer;
ft.version;
const {
  SvelteComponent: Zt,
  append_hydration: te,
  attr: ee,
  binding_callbacks: se,
  children: $t,
  claim_element: jt,
  detach: Ut,
  element: Yt,
  init: ie,
  insert_hydration: ne,
  noop: Wt,
  safe_not_equal: re,
  set_style: zt,
  toggle_class: It
} = window.__gradio__svelte__internal;
function ae(at) {
  let W, V;
  return {
    c() {
      W = Yt("div"), V = Yt("canvas"), this.h();
    },
    l(y) {
      W = jt(y, "DIV", { style: !0, class: !0 });
      var B = $t(W);
      V = jt(B, "CANVAS", {}), $t(V).forEach(Ut), B.forEach(Ut), this.h();
    },
    h() {
      zt(W, "justify-content", "center"), zt(W, "align-items", "center"), zt(W, "display", "flex"), zt(W, "flex-direction", "column"), ee(W, "class", "svelte-1gecy8w"), It(
        W,
        "table",
        /*type*/
        at[0] === "table"
      ), It(
        W,
        "gallery",
        /*type*/
        at[0] === "gallery"
      ), It(
        W,
        "selected",
        /*selected*/
        at[1]
      );
    },
    m(y, B) {
      ne(y, W, B), te(W, V), at[6](V);
    },
    p(y, [B]) {
      B & /*type*/
      1 && It(
        W,
        "table",
        /*type*/
        y[0] === "table"
      ), B & /*type*/
      1 && It(
        W,
        "gallery",
        /*type*/
        y[0] === "gallery"
      ), B & /*selected*/
      2 && It(
        W,
        "selected",
        /*selected*/
        y[1]
      );
    },
    i: Wt,
    o: Wt,
    d(y) {
      y && Ut(W), at[6](null);
    }
  };
}
function oe(at, W, V) {
  let y;
  var B = this && this.__awaiter || function(m, s, g, t) {
    function i(h) {
      return h instanceof g ? h : new g(function(f) {
        f(h);
      });
    }
    return new (g || (g = Promise))(function(h, f) {
      function w(M) {
        try {
          P(t.next(M));
        } catch (O) {
          f(O);
        }
      }
      function S(M) {
        try {
          P(t.throw(M));
        } catch (O) {
          f(O);
        }
      }
      function P(M) {
        M.done ? h(M.value) : i(M.value).then(w, S);
      }
      P((t = t.apply(m, s || [])).next());
    });
  };
  let { value: N } = W, { samples_dir: U } = W, { type: L } = W, { selected: C = !1 } = W;
  Qt.workerSrc = "https://cdn.jsdelivr.net/gh/freddyaboulton/gradio-pdf@main/pdf.worker.min.mjs";
  let x, A;
  function r(m) {
    return B(this, void 0, void 0, function* () {
      x = yield Jt(m).promise, d();
    });
  }
  function d() {
    x.getPage(1).then((m) => {
      const s = A.getContext("2d");
      s.clearRect(0, 0, A.width, A.height);
      const g = m.getViewport({ scale: 0.2 }), t = { canvasContext: s, viewport: g };
      V(2, A.width = g.width, A), V(2, A.height = g.height, A), m.render(t);
    });
  }
  function c(m) {
    se[m ? "unshift" : "push"](() => {
      A = m, V(2, A);
    });
  }
  return at.$$set = (m) => {
    "value" in m && V(3, N = m.value), "samples_dir" in m && V(4, U = m.samples_dir), "type" in m && V(0, L = m.type), "selected" in m && V(1, C = m.selected);
  }, at.$$.update = () => {
    at.$$.dirty & /*value*/
    8 && V(5, y = N.url), at.$$.dirty & /*url*/
    32 && r(y);
  }, [L, C, A, N, U, y, c];
}
class le extends Zt {
  constructor(W) {
    super(), ie(this, W, oe, ae, re, {
      value: 3,
      samples_dir: 4,
      type: 0,
      selected: 1
    });
  }
}
export {
  le as default
};
