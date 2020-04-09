import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

const isOverflowedX = elm => elm.scrollWidth > elm.clientWidth;

const isOverflowedY = elm => elm.scrollHeight > elm.clientHeight;
const addScrollbarXIfNeeded = elm => {
  if (isOverflowedX(elm)) elm.style.setProperty("overflow-x", "scroll");
  else elm.style.setProperty("overflow-x", "initial");
};

const addScrollbarYIfNeeded = elm => {
  if (isOverflowedY(elm)) elm.style.setProperty("overflow-y", "scroll");
  else elm.style.setProperty("overflow-y", "initial");
};
const maxWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const maxHeight =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

export default class DraggableElement extends React.Component {
  constructor(props) {
    super(props);
    this.dragMouseDown = this.dragMouseDown.bind(this);
    this.elementDrag = this.elementDrag.bind(this);
    this.closeDragElement = this.closeDragElement.bind(this);
  }

  dragMouseDown(e) {
    e.preventDefault();
    this.startX = e.clientX;
    this.startY = e.clientY;
    window.addEventListener("mousemove", this.elementDrag);
    window.addEventListener("mouseup", this.closeDragElement);
  }

  elementDrag(e) {
    e.preventDefault();
    const deltaX = this.startX - e.clientX;
    const deltaY = this.startY - e.clientY;
    const newTop = this.root.offsetTop - deltaY;
    const newLeft = this.root.offsetLeft - deltaX;
    const newRight = newLeft + this.root.offsetWidth;
    const newBottom = newTop + this.root.offsetHeight;
    console.log(
      "deltaX ",
      deltaX,
      "deltaY ",
      deltaY,
      "newTop ",
      newTop,
      "newLeft ",
      newLeft,
      "newRight ",
      newRight,
      "newBottom ",
      newBottom
    );

    if (
      newLeft >= 0 &&
      newLeft <= maxWidth &&
      newRight >= 0 &&
      newRight <= maxWidth
    ) {
      this.startX = e.clientX;
      this.root.style.left = `${newLeft}px`;
    }
    if (
      newTop >= 0 &&
      newTop <= maxHeight &&
      newBottom >= 0 &&
      newBottom <= maxHeight
    ) {
      this.startY = e.clientY;
      this.root.style.top = `${newTop}px`;
    }
  }
  closeDragElement() {
    window.removeEventListener("mouseup", this.closeDragElement);
    window.removeEventListener("mousemove", this.elementDrag);
  }

  componentDidMount() {
    this.root = ReactDOM.findDOMNode(this);
    this.content = this.root.querySelector(".content");
    this.header = this.root.querySelector(".header");
    const height = this.root.offsetHeight - this.header.offsetHeight;
    this.content.style.height = `${height}px`;
    addScrollbarXIfNeeded(this.content);
    addScrollbarYIfNeeded(this.content);
    this.header.addEventListener("mousedown", this.dragMouseDown);
  }

  componentWillUnmount() {
    this.header.removeEventListener("mousedown", this.dragMouseDown);
  }

  render() {
    const title = this.props.title || "Click here to move";
    const elemStyle = {
      width: `${this.props.width || 300}px`,
      height: `${this.props.height || 300}px`,
      top: `${this.props.top || 0}px`,
      left: `${this.props.left || 0}px`
    };

    return (
      <div className="lp-draggable-element" style={elemStyle}>
        <div className="header">{title}</div>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}