package cn.edu.cqu.jobhelper.controllers;

import java.util.List;
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
	
	@RequestMapping("/user/listAll.json")
	@ResponseBody
	public List<User> listAll(){
		List<User> users = userCRUD.getAll();
		return users;
	}
	/**
	 * 验证用户名
	 * @param username
	 * @return FormResponse
	 */
	@RequestMapping("/user/validateUsername.json")
	@ResponseBody
	public FormResponse validateUsername(String username){
		//testCRUD();
		System.out.println("当前用户名:"+username);
		FormResponse response = new FormResponse();
		try{
			if(userCRUD.getByUsername(username)!=null){
				response.addError("username", "该用户名已经被使用");
				response.setMsg("该用户名已经被使用");
			}
			if(!response.hasError()){
				response.setMsg("该用户名可以使用");
			}
		} catch(Exception e){
			response.setMsg("数据库系统错误,无法注册!");
			response.setSuccess(false);
			e.printStackTrace();
		}
		return response;
	}
	/**
	 * 验证手机号码
	 * @param phonenum
	 * @return FormResponse
	 */
	@RequestMapping("/user/validatePhone.json")
	@ResponseBody
	public FormResponse validatePhonenum(String phonenum){
		System.out.println("当前手机号:"+phonenum);
		FormResponse response = new FormResponse();
		try{
			if(userCRUD.getByPhonenum(phonenum)!=null){
				response.addError("phonenum", "该手机号已经被注册");
				response.setMsg("该手机号已经被注册");
			}
			if(!response.hasError()){
				response.setMsg("该手机号可以使用");
			}
		} catch(Exception e){
			response.setMsg("数据库系统错误,无法注册!");
			response.setSuccess(false);
			e.printStackTrace();
		}
		return response;
	}
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
			if(userCRUD.getByPhonenum(user.getPhonenum())!=null){
				response.addError("phonenum", "该手机号已经被注册");
				response.setMsg("该手机号已经被注册");
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
	public void testCRUD(){
		System.out.println(userCRUD==null);
	}
	public static void main(String[] args){
		UserController u = new UserController();
		u.testCRUD();
	}
}
