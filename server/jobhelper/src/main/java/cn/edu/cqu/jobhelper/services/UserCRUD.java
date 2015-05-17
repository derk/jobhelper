package cn.edu.cqu.jobhelper.services;

import java.util.List;

import cn.edu.cqu.jobhelper.domains.User;

public interface UserCRUD {
	public User getById(Long id);
	public User getByUsername(String username);
	public User getByPhonenum(String phonenum);
	public void add(User user);
	public void edit(Long id,User user);
	public List<User> getAll();
	public void deleteById(Long id);
}
