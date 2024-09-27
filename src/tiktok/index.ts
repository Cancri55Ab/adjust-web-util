import { macros, uri } from "../utils";

// 转为 adjust 点击地址
export function parseToAdClickUrl(): string {
  if (!this.adUrl) {
    console.error("未定义url");
    return "";
  }

  // 地址栏中的参数
  const _uri = uri(location.search);
  this.debug && console.log("当前页面uri: ", _uri);

  const macrosFix = ["__", "__"];

  // adjust 中的宏数据
  const _param = macros(this.adUrl?.search, macrosFix);
  if (!_param) {
    console.error("未找到search宏数据");
    return "";
  }
  this.debug && console.log("adjust链接宏数据: ", _param);

  // 把adjust中需要的宏数据，替换为地址栏中带的数据
  let _url = this.adUrl?.search;
  for (let i = 0; i < _param.length; i++) {
    const element = _param[i];
    _url = _url.replace(
      element,
      _uri.get(element.slice(macrosFix[0].length, -macrosFix[1].length)) || ""
    );
  }
  // 组合成adjust地址返回
  const _redirectUrl = `${this.adUrl?.origin}${this.adUrl?.pathname}${_url}`;
  // 追加点击下载时 ad来源统计链接 (ad文档: 广告主落地页设置)
  return `${this.adUrl?.origin}${
    this.adUrl?.pathname
  }?engagement_type=fallback_click&redirect=${encodeURI(_redirectUrl)}`;
}

/**
 * 生成一个地址给 tiktok 后台配置
 */
export function parseTemplateUrl2_tiktokConfig(
  htmlUrl: string = location.origin + location.pathname
): string {
  if (!this.adUrl) {
    console.error("未定义url");
    return "";
  }

  const macrosFix = ["__", "__"];

  // adjust 中的宏数据
  const _param = macros(this.adUrl?.search, macrosFix);

  console.log("adjust 获取到的宏 _param: ", _param);
  if (!_param) {
    console.error("未找到search宏数据");
    return "";
  }
  const _url = new URL(htmlUrl);
  let _search = _url.search ? _url.search : "?c_source=Tiktok";
  for (const e of _param) {
    console.log("_param e:", e);
    _search += `&${e.slice(macrosFix[0].length, -macrosFix[1].length)}=${e}`;
  }
  _url.search = _search;
  return _url.href;
}
