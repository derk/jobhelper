package cn.edu.cqu.jobhelper.controllers;

import java.io.IOException;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.edu.cqu.jobhelper.domains.Job;
import cn.edu.cqu.jobhelper.domains.User;
import cn.edu.cqu.jobhelper.json.FormResponse;
import cn.edu.cqu.jobhelper.services.JobCRUD;

@Controller
public class JobController {
	@Autowired
	@Qualifier("jobCRUDHibernate")
	private JobCRUD jobCRUD;

	private String jobCategory;
	private String jobName;
	private String jobId;
	private String jobCity;
	private String jobSalary;
	private String jobExperience;
	private String jobEducation;
	private String jobFormality;
	private String companyName;
	private String companyId;
	private String companyAddress;
	private String companyPage;
	private double companyLat;
	private double companyLng;

	/**
	 * 获得整个工作列表
	 * 
	 * @return List<Job>
	 */
	@RequestMapping("/job/listAll.json")
	@ResponseBody
	public List<Job> listAll() {
		List<Job> jobs = jobCRUD.getAll();
		return jobs;
	}

	@RequestMapping("/job/test.do")
	@ResponseBody
	public FormResponse testJob() {
		FormResponse response = new FormResponse();
		response.setMsg("hahah");
		return response;
	}

	@RequestMapping("/job/searchJob.json")
	@ResponseBody
	public List<Job> searchJob(String cityname, String jobcate) {
		System.out.println("cityname:" + cityname);
		System.out.println("jobcate:" + jobcate);
		if (cityname == null || cityname.equals("全国"))
			cityname = "";
		if (jobcate == null)
			jobcate = "";
		List<Job> jobs = jobCRUD.getListBy(cityname, jobcate);
		return jobs;
	}

	@RequestMapping("/job/getJobDetail.json")
	@ResponseBody
	public Job getJobDetail(@RequestBody Job job) {
		System.out.println("工作名称:"+job.getJobName()+",公司:"+job.getCompanyName());
		//工作 http://www.lagou.com/jobs/671372.html?source=search
		String jobSrc="http://www.lagou.com/jobs/"+job.getJobId()+".html?source=search";
		try {
			Document doc = Jsoup.connect(jobSrc).timeout(10000).get();
			Element job_detail = doc.select("dl.job_detail").first();
			String jobDate = job_detail.select("dd.job_request").first().select("div").first().text();
			String jobDescribe = job_detail.select("dd.job_bt").first().toString();
//			jobDescribe.replace("h3", "h1");  //这句话不行
//			System.out.println("发布时间:"+jobDate);
//			System.out.println("描述:"+jobDescribe);
			job.setJobDate(jobDate);
			job.setJobDescribe(jobDescribe);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//爬取发布时间和职位描述
		return job;
	}
	@RequestMapping("/job/getCompanyDetail.json")
	@ResponseBody
	public Job getCompanyDetail(@RequestBody Job job){
		System.out.println("工作名称:"+job.getJobName()+",公司:"+job.getCompanyName());
		//公司 http://www.lagou.com/gongsi/147.html
		String companySrc = "http://www.lagou.com/gongsi/"+job.getCompanyId()+".html";
		try {
			Document doc = Jsoup.connect(companySrc).timeout(10000).get();
			String companyImgSrc = doc.select("div#logoShow").first().select("img").first().attr("src");
			String companyDetailName = doc.select("h1.fullname").first().attr("title");
			String companyDescribe = doc.select("dl.c_section").first().text();
			job.setCompanyImgSrc(companyImgSrc);
			job.setCompanyDetailName(companyDetailName);
			job.setCompanyDescribe(companyDescribe);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//爬取公司图片,详细名称,公司详细描述
		return job;
	}
	@RequestMapping("/job/getInfo.do")
	@ResponseBody
	public FormResponse searchInAllCategory() {
//		try {
//			FormResponse response = new FormResponse();
//			Document doc = Jsoup.connect("http://www.lagou.com/")
//					.timeout(10000).get();
//			Elements mainNavs = doc.select("div.mainNavs dl.reset");
//			for (Element reset : mainNavs) {
//				Element dd = reset.select("dd").first();
//				Elements jobs = dd.select("a");
//				for (Element job : jobs) {
//					String category = job.text();
//					if (category.equals("C#"))
//						continue;
//					if (category.equals("C++"))
//						continue;
//					if (category.equals("C"))
//						category = "C/C++";
//					String src = job.attr("href");
//					// System.out.println("category:"+category+",src:"+src);
//					searchInOneCategory(category, src);
//				}
//			}
//			response.setMsg("执行完毕");
//			return response;
//		} catch (IOException e) {
//			e.printStackTrace();
//			return null;
//		}
		FormResponse response = new FormResponse();
		searchInOneCategory("Java", "http://www.lagou.com/zhaopin/Java?labelWords=label");
		searchInOneCategory("Python", "http://www.lagou.com/zhaopin/Python?labelWords=label");
		searchInOneCategory("IDC", "http://www.lagou.com/zhaopin/idc?labelWords=label");
		response.setMsg("执行完毕");
		return response;
	}

	private void searchInOneCategory(String jobCategory, String src) {
		int count = 0;
		for (int i = 1;; i++) {
			String pageSrc = src + "&pn=" + i;
			// System.out.println("PageSrc:"+pageSrc);
			try {
				Document doc = Jsoup.connect(pageSrc).timeout(10000).get();
				Element noresult = doc.select("div.content div.noresult")
						.first();
				if (noresult != null) {
					break;
				} else {
					Elements clearfixs = doc.select("li.clearfix");
					for (Element clearfix : clearfixs) {
						// 工作id
						this.jobId = clearfix.attr("data-jobid");
						Element hot_pos_l = clearfix.select("div.hot_pos_l")
								.first();
						// 工作名称
						this.jobName = hot_pos_l.select("div.mb10").first()
								.select("a").first().attr("title");
						String detailSrc = hot_pos_l.select("div.mb10").first()
								.select("a").first().attr("href");
						// 进入工作详细信息页面获得月薪,工作城市,工作经验,最低学历,工作性质,公司地址等信息
						Document detailDoc = Jsoup.connect(detailSrc)
								.timeout(10000).get();
						Elements details = detailDoc.select("dd.job_request")
								.first().select("span");
						int j = 0;
						String[] infos = new String[5];
						for (Element request : details) {
							infos[j] = request.text();
							j++;
						}
						this.jobSalary = infos[0].trim();
						this.jobCity = infos[1].trim();
						this.jobExperience = infos[2].trim();
						this.jobEducation = infos[3].trim();
						this.jobFormality = infos[4].trim();
						Element jobCompanyDD = detailDoc.select(
								"dl.job_company dd").first();
						this.companyAddress = jobCompanyDD.select("div")
								.first().text();
						this.companyPage = jobCompanyDD.select("a").first()
								.attr("href");
						// System.out.println("公司地址:"+companyAddress);
						// 获取公司名称,公司id
						Element hot_pos_r = clearfix.select("div.hot_pos_r")
								.first();
						this.companyName = hot_pos_r.select("div.mb10 a")
								.first().attr("title");
						this.companyId = hot_pos_r.select("div.mb10 a").first()
								.attr("href");
						for (int g = companyId.length() - 1; g >= 0; g--) {
							if (companyId.charAt(g) == '/') {
								companyId = companyId.substring(g + 1,
										companyId.length() - 5);
								break;
							}
						}
						this.jobCategory = jobCategory;
						// 获得经纬度
						setLatAndLng(this.companyAddress, this.jobCity);
						if(this.companyLat!=0 && this.companyLng!=0){
							Job newJob = new Job(this.jobCategory, this.jobName,
									this.jobId, this.jobCity, this.jobSalary,
									this.jobExperience, this.jobEducation,
									this.jobFormality, this.companyName,
									this.companyId, this.companyAddress,
									this.companyLat, this.companyLng,
									this.companyPage);
							System.out.println(newJob);
							jobCRUD.add(newJob);
							count++;
						}
					}
				}
			} catch (IOException e) {

				e.printStackTrace();
			}
		}
		System.out.println("count:" + count);
	}

	public void setLatAndLng(String companyAddress, String jobCity)
			throws ClientProtocolException, IOException {
		// 获取数据用get方法
		// http://api.map.baidu.com/geocoder/v2/?address=百度大厦&city=北京市&output=json&ak=0MDkasqiLaCZjxP5iXMVPacj
		companyAddress = companyAddress.replace(" ", "");
		CloseableHttpClient httpClient = HttpClients.createDefault();
		try {
			HttpGet httpget = new HttpGet(
					"http://api.map.baidu.com/geocoder/v2/?address="
							+ companyAddress + "&city=" + jobCity
							+ "&output=json&ak=0MDkasqiLaCZjxP5iXMVPacj");

			RequestConfig requestConfig = RequestConfig.custom()
					.setSocketTimeout(5000).setConnectTimeout(5000)
					.setConnectionRequestTimeout(5000).build();
			httpget.setConfig(requestConfig);
			// System.out.println(httpget.getRequestLine());
			ResponseHandler<String> responseHandler = new ResponseHandler<String>() {
				@Override
				public String handleResponse(final HttpResponse response)
						throws ClientProtocolException, IOException {
					int status = response.getStatusLine().getStatusCode();
					if (status >= 200 && status < 300) {
						HttpEntity entity = response.getEntity();
						return entity != null ? EntityUtils.toString(entity)
								: null;
					} else {
						throw new ClientProtocolException(
								"Unexpected response status: " + status);
					}
				}
			};
			String responseBody = httpClient.execute(httpget, responseHandler);
			System.out.println("----------------------------------------");
			System.out.println(responseBody);
			JSONObject jsonObj = new JSONObject(responseBody);
			if(jsonObj.has("result")){
				JSONObject location = jsonObj.getJSONObject("result")
						.getJSONObject("location");
				// 纬度
				companyLat = location.getDouble("lat");
				// 经度
				companyLng = location.getDouble("lng");
				System.out.println("companyLng:" + companyLng);
				System.out.println("companyLat:" + companyLat);
			}
			else{
				companyLat=0;
				companyLng=0;
			}
		} finally {
			httpClient.close();
		}
	}

	public static void main(String[] args) throws ClientProtocolException,
			IOException {
		// JobController j = new JobController();
		// j.searchInAllCategory();
		// j.setLatAndLng("百度大厦", "北京市");
	}
}
