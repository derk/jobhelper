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
		Job j = this.getById(id);
		j.setJobCategory(job.getJobCategory());
		j.setJobName(job.getJobName());
		j.setJobId(job.getJobId());
		j.setJobCity(job.getJobCity());
		j.setJobSalary(job.getJobSalary());
		j.setJobExperience(job.getJobExperience());
		j.setJobEducation(job.getJobEducation());
		j.setJobFormality(job.getJobFormality());
		j.setCompanyName(job.getCompanyName());
		j.setCompanyId(job.getCompanyId());
		j.setCompanyAddress(job.getCompanyAddress());
		ht.update(j);
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
	
//	@SuppressWarnings("unchecked")
//	@Override
//	public List<Job> getListBy(String jobCity, String jobCate) {
//		List<Job> jobs=null;
//		if(jobCity.equals("") && jobCate.equals(""))
//			jobs = this.getAll();
//		else if(!jobCity.equals("") && jobCate.equals(""))
//			jobs = (List<Job>)ht.find("from Job where jobCity=?", jobCity);
//		else if(jobCity.equals("") && !jobCate.equals(""))
//			jobs = (List<Job>)ht.find("from Job where jobCategory=?", jobCate);
//		else
//			jobs = (List<Job>)ht.find("from Job where jobCity=? and jobCategory=?", jobCity,jobCate);
//		return jobs;
//	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Job> getBySql(String sql,Object... args) {
		//List<Job> jobs = ht.find(queryString, values)
		List<Job> jobs = (List<Job>) ht.find(sql, args);
		if(jobs.size()>0){
			return jobs;
		}
		return null;
	}

}
