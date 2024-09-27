// url中"?"符及后的字串
export function uri(_search: string): Map<string, any> {
  const params = new Map();
  if (_search.indexOf("?") != -1) {
    const strs = _search.slice(1).split("&");
    this.debug && console.log("strs: ", strs);
    for (let i = 0; i < strs.length; i++) {
      const [key, value] = strs[i].split("=");
      params.set(key, decodeURIComponent(value));
    }
  }
  return params;
}

/**
 * 解析宏参数
 * @param str
 * @param macrosFix 宏规则 "{" 或者 "__"
 * @returns
 */
export function macros(
  str: string,
  macrosFix: Array<string> = ["{", "}"]
): RegExpMatchArray | null {
  const reg = new RegExp(`${macrosFix[0]}(.*?)${macrosFix[1]}`, "g");
  return str.match(reg);
}
