package cn.edu.cqu.jobhelper.domains;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="jobs")
public class Job {
	/**
	 * 自动增长的逻辑主键
	 */
	@Id
	@GeneratedValue
	private Long id;
	/*
	 * 工作分类
	 */
	@Column(name="工作分类",length=50,nullable=false,unique=false)
	private String jobCategory;
	/*
	 * 工作名称
	 */
	@Column(name="工作名称",length=120,nullable=false,unique=false)
	private String jobName;
	/*
	 * 工作的id,用于在拉勾网上查找相应网页
	 */
	@Column(name="工作id",length=10,nullable=false,unique=false)
	private String jobId;
	/*
	 * 工作城市
	 */
	@Column(name="城市",length=20,nullable=false,unique=false)
	private String jobCity;
	/*
	 * 月薪
	 */
	@Column(name="月薪",length=15,nullable=false,unique=false)
	private String jobSalary;
	/*
	 * 经验
	 */
	@Column(name="工作经验",length=15,nullable=false,unique=false)
	private String jobExperience;
	/*
	 * 最低学历
	 */
	@Column(name="最低学历",length=15,nullable=false,unique=false)
	private String jobEducation;
	/*
	 * 工作性质
	 */
	@Column(name="工作性质",length=15,nullable=false,unique=false)
	private String jobFormality;
	/*
	 * 公司的名称
	 */
	@Column(name="公司名",length=120,nullable=false,unique=false)
	private String companyName;
	/*
	 * 公司的id(或者链接)
	 */
	@Column(name="公司id",length=50,nullable=false,unique=false)
	private String companyId;
	/*
	 * 公司地址
	 */
	@Column(name="公司地址",length=90,nullable=false,unique=false)
	private String companyAddress;
	/*
	 * 公司地址纬度
	 */
	@Column(name="纬度",nullable=false,unique=false)
	private double companyLat;
	/*
	 * 公司地址经度
	 */
	@Column(name="经度",nullable=false,unique=false)
	private double companyLng;
	/*
	 * 公司主页
	 */
	@Column(name="公司主页",length=150,nullable=false,unique=false)
	private String companyPage;
	
	
	//不用存入数据库的属性
	//获得客户端请求后再设置这些
	private String jobDescribe;
	private String companyDescribe;
	public Job() {
		super();
	}
	

	public Job(String jobCategory, String jobName, String jobId,
			String jobCity, String jobSalary, String jobExperience,
			String jobEducation, String jobFormality, String companyName,
			String companyId, String companyAddress, double companyLat,
			double companyLng, String companyPage) {
		super();
		this.jobCategory = jobCategory;
		this.jobName = jobName;
		this.jobId = jobId;
		this.jobCity = jobCity;
		this.jobSalary = jobSalary;
		this.jobExperience = jobExperience;
		this.jobEducation = jobEducation;
		this.jobFormality = jobFormality;
		this.companyName = companyName;
		this.companyId = companyId;
		this.companyAddress = companyAddress;
		this.companyLat = companyLat;
		this.companyLng = companyLng;
		this.companyPage = companyPage;
	}


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getJobCategory() {
		return jobCategory;
	}
	public void setJobCategory(String jobCategory) {
		this.jobCategory = jobCategory;
	}
	public String getJobName() {
		return jobName;
	}
	public void setJobName(String jobName) {
		this.jobName = jobName;
	}
	public String getJobId() {
		return jobId;
	}
	public void setJobId(String jobId) {
		this.jobId = jobId;
	}
	public String getJobCity() {
		return jobCity;
	}
	public void setJobCity(String jobCity) {
		this.jobCity = jobCity;
	}
	public String getJobSalary() {
		return jobSalary;
	}
	public void setJobSalary(String jobSalary) {
		this.jobSalary = jobSalary;
	}
	public String getJobExperience() {
		return jobExperience;
	}
	public void setJobExperience(String jobExperience) {
		this.jobExperience = jobExperience;
	}
	public String getJobEducation() {
		return jobEducation;
	}
	public void setJobEducation(String jobEducation) {
		this.jobEducation = jobEducation;
	}
	public String getJobFormality() {
		return jobFormality;
	}
	public void setJobFormality(String jobFormality) {
		this.jobFormality = jobFormality;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getCompanyAddress() {
		return companyAddress;
	}
	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}
	public String getCompanyPage() {
		return companyPage;
	}
	public void setCompanyPage(String companyPage) {
		this.companyPage = companyPage;
	}
	public String getJobDescribe() {
		return jobDescribe;
	}
	public void setJobDescribe(String jobDescribe) {
		this.jobDescribe = jobDescribe;
	}
	public String getCompanyDescribe() {
		return companyDescribe;
	}
	public void setCompanyDescribe(String companyDescribe) {
		this.companyDescribe = companyDescribe;
	}
	public String toString(){
		String str1="工作类别:"+jobCategory;
		String str2="工作名称:"+jobName;
		String str3="工作id:"+jobId;
		String str4="工作城市:"+jobCity;
		String str5="月薪:"+jobSalary;
		String str6="经验:"+jobExperience;
		String str7="最低学历:"+jobEducation;
		String str8="工作性质:"+jobFormality;
		String str9="公司名称:"+companyName;
		String str10="公司id:"+companyId;
		String str11="公司地址:"+companyAddress;
		String str12="公司主页:"+companyPage;
		return str1+","+str2+","+str3+","+str4+","+str5+","+str6+","+str7+","+str8+
				","+str9+","+str10+","+str11+","+str12;
	}
}
