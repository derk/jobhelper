package cn.edu.cqu.jobhelper.services.hibernate;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.edu.cqu.jobhelper.domains.User;
import cn.edu.cqu.jobhelper.services.UserCRUD;

@Service("userCRUDHibernate")
public class UserCRUDHibernate implements UserCRUD{
	private HibernateTemplate ht;
	
	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		ht = new HibernateTemplate(sessionFactory);
	}

	@Override
	public User getById(Long id) {
		return ht.get(User.class, id);
	}

	@Override
	@Transactional
	public void add(User user) {
		ht.save(user);
	}

	@Override
	@Transactional
	public void edit(Long id, User user) {
		User u = this.getById(id);
		u.setUsername(user.getUsername());
		u.setPhonenum(user.getPhonenum());
		u.setPassword(user.getPassword());
		ht.update(u);
		
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<User> getAll() {
		List<User> users = (List<User>)ht.find("from User");
		return users;
	}

	@Override
	@Transactional
	public void deleteById(Long id) {
		User u = this.getById(id);
		ht.delete(u);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public User getByUsername(String username) {
		List<User> users=(List<User>)ht.find("from User where username=?", username);
		if(users.size()>0)
			return users.get(0);
		else
			return null;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public User getByPhonenum(String phonenum) {
		List<User> users=(List<User>)ht.find("from User where phonenum=?", phonenum);
		if(users.size()>0)
			return users.get(0);
		else
			return null;
	}

	
	
}
