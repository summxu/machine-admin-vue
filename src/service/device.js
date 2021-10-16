/*
 * @Author: Chenxu
 * @Date: 2021-03-24 10:23:05
 * @LastEditTime: 2021-10-16 16:37:34
 * @Msg: Nothing
 */
import { BaseService, Service, Permission } from "cl-admin";

@Service("machine/device")
class Device extends BaseService {
	@Permission("getParams")
  getParams(params) {
		return this.request({
			url: "/getParams",
			method: "GET",
			params
		});
  }

  @Permission("sendParams")
  sendParams(data) {
		return this.request({
			url: "/sendParams",
			method: "POST",
			data
		});
  }
}

export default Device;
