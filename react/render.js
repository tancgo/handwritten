const vdom = {
  type: "h1",
  props: {
    className: "hello",
    style: "color: red",
  },
  children: [
    {
      type: "div",
      props: {
        className: "dev-hello",
        style: "color: yellow; height: 100px; width:200px",
        onClick: () => {
          console.log("hello world");
        },
      },
      children: [
        {
          type: "text",
          value: "hello html",
        },
      ],
    },
    {
      type: "text",
      value: "hello wolrd",
    },
  ],
};

const render = (vnode, container) => {
  if (vnode.type === "text") {
    const textNode = document.createTextNode(vnode.value);
    return container.appendChild(textNode);
  }

  const dom = document.createElement(vnode.type);

  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key]
      if (key === "classNmae") {
        dom.setAttribute("class", value);
      }

      if (key === "style") {
        dom.setAttribute(key, value);
      }

      if (/on\w+/.test(key)) {
        dom[key.toLowerCase()] = value;
      }
    }
  }

  vnode.children.length &&
    vnode.children.forEach((node) => {
      return render(node, dom);
    });

  return container.appendChild(dom);
};

const root = document.querySelector("body");

render(vdom, root);
