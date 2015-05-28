package cn.edu.cqu.jobhelper.domains;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="users")
public class User {
	/**
	 * 自动增长的逻辑主键
	 */
	@Id
	@GeneratedValue
	private Long id;
	/**
	 * 用户名（唯一）
	 */
	@Column(length=50,nullable=false,unique=true)
	private String username;
	/**
	 * 登录邮箱（唯一）
	 */
	@Column(length=60,nullable=false,unique=true)
	private String phonenum;
	/**
	 * 登录密码
	 */
	@Column(length=60,nullable=false,unique=false)
	private String password;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getPhonenum() {
		return phonenum;
	}
	public void setPhonenum(String phonenum) {
		this.phonenum = phonenum;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
}
