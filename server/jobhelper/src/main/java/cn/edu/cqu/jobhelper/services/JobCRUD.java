package cn.edu.cqu.jobhelper.services;

import java.util.List;

import cn.edu.cqu.jobhelper.domains.Job;

public interface JobCRUD {
	public Job getById(Long id);
	public Job getByJobId(String jobId);
	public void add(Job job);
	public void edit(Long id,Job job);
	public List<Job> getAll();
	public List<Job> getListBy(String jobCity,String jobCate);
	public void deleteById(Long id);
}
