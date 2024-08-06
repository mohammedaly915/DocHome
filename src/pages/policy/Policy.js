import React, { useRef, useState } from 'react'
import './Policy.scss'
const Policy = () => {
    const [activeItem,setActiveItem]=useState()
    const secRef=useRef([])
    const handleActive=(index)=>{
        setActiveItem(index);
    }
    const handleRef = (index) => {
        if (secRef.current[index]) {
          secRef.current[index-1].scrollIntoView({ behavior: 'smooth' });
        }
      };
    const policy=[
        {condition:"Usage License",policy:"Usage License: This section specifies how users can use the application and what uses are allowed and prohibited."},
        {condition:"Data Privacy",policy:"Privacy and Personal Data: This section explains how personal data of users is collected, used, and protected, along with the privacy policy followed."},
        {condition:"Intellectual Property",policy:"Intellectual Property: This section outlines the intellectual property rights related to the application, such as trademarks and copyrights, and how users can use the content within the application."},
        {condition:"Responsibilities",policy:"Obligations and Responsibilities: This section describes the mutual responsibilities between you and the users, as well as the potential penalties for violating the terms and conditions."},
        {condition:"Indemnification",policy:"Indemnification and Liability Waiver: This section defines the applicable laws in case of compensation for damages or losses that users may incur and the liability waiver for certain matters."},
        {condition:"Organization of work",policy:"Organization of work: Terms and conditions help you organize your rights and duties, as well as the user side of your platform. Through it, you can definitively determine the limits of what the user is allowed to benefit from, and the limits of your benefit as well from the information he shares with you. Preventing Violations The Terms and Conditions help to develop a deterrent solution to electronic violations, whether they are: Publishing illegal content that aims to promote illegal practices that entail civil liability. Publishing news and lies related to distorting a person’s public image. Publishing content that aims to blackmail an individual or includes obscene pornographic materials. Impersonating the user. An individual using the site to download malicious programs or spreading viruses or any harmful computer codes. Using the site to promote a competitor or publishing content unrelated to the services provided. Representing an institution or body without the user being authorized to claim this representation. Publishing materials that harm the intellectual property of their owners and falling within the framework of Stealing control over the site and changing or modifying its design"},
        {condition:"Safety",policy:"We collect data about customers and employees for the safety of both parties. The site is also not responsible for all transactions that take place through it due to the negligence resulting from both parties, and that all existing transactions between the two parties are merely connecting the parties to each other, and it is not legally responsible in various ways, and the site provides free medical service without the slightest responsibility for it."},
        {condition:"Property Rights",policy:"Property rights: The terms and conditions set forth in your electronic platform help you document your intellectual and legal right in everything related to this platform. The user may not steal or misuse it, or attempt to attribute it to him. Limitation of Liability: When you set terms and conditions between you and your target customers, you are setting limits on liability between you and them. You are not obligated if customers share their personal information with another user."},
        {condition:"Maintaining Privacy",policy:"Maintaining privacy: The information that users share with you, whether it is information about purchasing transactions or their personal data when logging in, is very private data whose use and limits must be regulated. Many customers want to feel secure that their data is being used legitimately and is not being leaked to any other unannounced party, so you must explain in detail the limits of your use of this data, and the terms you are committed to in order to preserve their privacy, and whenever these terms are formulated in a clear, focused and easy way. Understanding, the better for the customer and your brand image."},
        {condition:"Platform Objectives",policy:"The platform does not and cannot change public opinion. Its goal is to connect the health care provider to the health care and service seeker. Its goal is to help the community. Costs cannot be recovered if the procedure is implemented or the opinion of the case is changed."},
        {condition:"Caregiver",policy:"It is the responsibility of the health care provider to be academically and professionally qualified and to provide health service at the highest level without negligence on his part."},
        {condition:"The Patient",policy:"It is the responsibility of the recipient of the service not to attack the health service provider by insulting or insulting him. Otherwise, the incident will be recorded in the record and he will be sued."},
        {condition:"The Owner",policy:"Taking into account the terms and conditions, the company disclaims any responsibility for either party, taking into account the provision of high-quality service"},
        {condition:"Amend The Terms",policy:"The company may amend the terms related to services from time to time. Both parties are committed to transactions within the limits and umbrella of the program, knowing all the details and transactions between the two parties, the health care provider’s commitment to work rules and accounts, and sending the agreed-upon percentage between the program and the service provider in accordance with the labor law."}
    ]
  return (
    <>
        <section id='Condition' className='py-5 mt-3 bg-light '>
            <div className="container bg-white shadow shadow-3 ">
                <h3 className='fs-3 mb-5 pt-3  text-center'> Terms  and  conditions</h3>
                <div className="row g-2">
                    <div className="col-md-2">
                        <div  className="conditionContent  py-2 ps-5 mx-auto w-auto">
                            {policy.map((policy,index)=>(<p  key={index} 
                                        onClick={()=>{
                                            handleActive(index);
                                            handleRef(index);
                                            }} className={index===activeItem ?"text-black":"text-muted"}>{policy.condition}</p>))}
                        </div>
                    </div>
                    <div className="policy col-md-9 offset-md-1">
                        <div className="ConditionContent-2 ">
                            <p className='text-black lead opacity-100 '>Can you clarify what "terms and conditions" mean in the context of our application?"
                                Certainly! In the context of your application, "terms and conditions" refer to a set of rules and conditions that users must agree to and comply with when using your application. These terms and conditions define the legal relationship between you as the owner of the application and the users who download and use the application. <br />
                               <br/>The "terms and conditions" may include topics such as: 
                            </p>
                           {policy.map((condition,index)=>(<p key={index} ref={(e)=>secRef.current[index]=e} className={`text-black lead opacity-75 fs-5`}>{condition.policy}</p>))     }
                        </div>
                    </div>
                </div>
            </div>


        </section>

    </>
  )
}

export default Policy