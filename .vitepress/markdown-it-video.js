const videoExtensions = /\.(mp4|webm|ogg|mov)$/i;

function videoPlugin(md) {
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const hrefIndex = token.attrIndex('href');

    if (hrefIndex >= 0) {
      const href = token.attrs[hrefIndex][1];
      if (videoExtensions.test(href)) {
        const type = href.match(videoExtensions)[1].toLowerCase();
        return `<video controls><source src="${href}" type="video/${type}">`;
      }
    }
    return defaultRender(tokens, idx, options, env, self);
  };

  const defaultCloseRender =
    md.renderer.rules.link_close ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_close = function (tokens, idx, options, env, self) {
    const prevToken = tokens[idx - 1];
    if (
      prevToken &&
      prevToken.type === 'text' &&
      videoExtensions.test(prevToken.content)
    ) {
      return '</video>';
    }
    return defaultCloseRender(tokens, idx, options, env, self);
  };
}

module.exports = videoPlugin;
