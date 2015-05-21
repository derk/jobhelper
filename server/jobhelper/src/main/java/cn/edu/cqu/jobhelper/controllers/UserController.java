package cn.edu.cqu.jobhelper.controllers;

import java.util.List;
import java.util.Random;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.edu.cqu.jobhelper.domains.User;
import cn.edu.cqu.jobhelper.json.FormResponse;
import cn.edu.cqu.jobhelper.services.JobCRUD;
import cn.edu.cqu.jobhelper.services.UserCRUD;

@Controller
public class UserController {
	@Autowired
	@Qualifier("userCRUDHibernate")
	private UserCRUD userCRUD;
	/**
	 * 获得整个用户列表
	 * @return List<User>
	 */
	@RequestMapping("/user/listAll.json")
	@ResponseBody
	public List<User> listAll(){
		List<User> users = userCRUD.getAll();
		return users;
	}
	/**
	 * 验证手机号并产生6位随机验证码
	 * @param phonenum
	 * @return FormResponse
	 */
	@RequestMapping("/user/sendSMS.json")
	@ResponseBody
	public FormResponse sendSMS(String phonenum){
		System.out.println("要发送验证码的手机号:"+phonenum);
		FormResponse response = new FormResponse();
		//验证手机号
		try{
			if(userCRUD.getByPhonenum(phonenum)!=null){
				response.addError("phonenum", "该手机已经被注册过了");
				response.setMsg("该手机已经被注册过了");
			}
			if(!response.hasError()){
				Random random = new Random();
				int num = Math.abs(random.nextInt())%900000+100000;
				String validateCode=String.valueOf(num);
				response.setMsg(validateCode);
			}
		} catch(Exception e){
			response.setMsg("数据库系统错误,无法注册!");
			response.setSuccess(false);
			e.printStackTrace();
		}
		System.out.println("返回的验证码:"+response.getMsg());
		return response;
	}
	/**
	 * 添加用户
	 * @param user
	 * @return FormResponse
	 */
	@RequestMapping("/user/addUser.json")
	@ResponseBody
	public FormResponse addUser(@RequestBody User user){//String username,String phonenum,String password){
		System.out.println("User:"+user.getUsername()+"，phone:"+user.getPhonenum());
		//System.out.println("User:"+username+"，phone:"+phonenum+",pwd:"+password);
		FormResponse response = new FormResponse();
		try {
			if(userCRUD.getByUsername(user.getUsername())!=null){
				response.addError("username", "该用户名已经被使用");
				response.setMsg("该用户名已经被使用");
			}
			if(response.hasError()){
				//response.setMsg("数据异常,无法添加!");	
			}
			else{
				userCRUD.add(user);
				response.setMsg("注册成功");
			}
		} catch(Exception e){
			response.setMsg("数据库系统错误,无法注册!");
			response.setSuccess(false);
			e.printStackTrace();
		}
		return response;
	}
	/**
	 * 登录
	 * @param phonenum
	 * @param password
	 * @return FormResponse
	 */
	@RequestMapping("/user/loginUser.json")
	@ResponseBody
	public FormResponse loginUser(String phonenum,String password){
		System.out.println("login.info:"+phonenum+",login.password:"+password);
		FormResponse response = new FormResponse();
		try {
			User u=userCRUD.getByPhonenum(phonenum);
			if(u==null){
				response.addError("phonenum", "此手机号未注册");
				response.setMsg("此手机号未注册");
			}
			else{
				String passwd=u.getPassword();
				if(!passwd.equals(password)){
					response.addError("password", "密码错误");
					response.setMsg("密码错误");
				}
			}
			if(!response.hasError()){
				response.setMsg(u.getUsername());
			}
		} catch(Exception e){
			response.setMsg("数据库系统错误,无法登录!");
			response.setSuccess(false);
			e.printStackTrace();
		}
		return response;
	}
}
