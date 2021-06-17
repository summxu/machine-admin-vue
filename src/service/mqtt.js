/*
 * @Author: Chenxu
 * @Date: 2021-03-24 10:23:05
 * @LastEditTime: 2021-03-30 16:41:36
 * @Msg: Nothing
 */
import { BaseService, Service, Permission } from "cl-admin";

@Service("machine/mqtt")
class Mqtt extends BaseService {
@Permission("sendmsg")
  sendmsg(data) {
		return this.request({
			url: "/sendmsg",
			method: "POST",
			data
		});
  }
  
}

export default Mqtt;
