package cn.edu.cqu.jobhelper.services.hibernate;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.edu.cqu.jobhelper.domains.Job;
import cn.edu.cqu.jobhelper.services.JobCRUD;

/*
 * TODO:后面用Hibernate 搜索引擎来加快查找
 */
@Service("jobCRUDHibernate")
public class JobCRUDHibernate implements JobCRUD{
	private HibernateTemplate ht;
	
	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		ht = new HibernateTemplate(sessionFactory);
	}
	
	@Override
	public Job getById(Long id) {
		return ht.get(Job.class, id);
	}
	@SuppressWarnings("unchecked")
	@Override
	public Job getByJobId(String jobId) {
		List<Job> jobs=(List<Job>)ht.find("from Job where jobId=?", jobId);
		if(jobs.size()>0)
			return jobs.get(0);
		else
			return null;
	}
	@Override
	@Transactional
	public void add(Job job) {
		ht.save(job);
	}

	@Override
	@Transactional
	public void edit(Long id, Job job) {
		
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Job> getAll() {
		List<Job> jobs = (List<Job>)ht.find("from Job");
		return jobs;
	}

	@Override
	@Transactional
	public void deleteById(Long id) {
		Job j = this.getById(id);
		ht.delete(j);
	}

}
