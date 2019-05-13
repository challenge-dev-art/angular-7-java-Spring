package com.javasampleapproach.springrest.mysql.controller;

import com.javasampleapproach.springrest.mysql.model.*;
import com.javasampleapproach.springrest.mysql.repo.RoleRepository;
import com.javasampleapproach.springrest.mysql.repo.SectionRepository;
import com.javasampleapproach.springrest.mysql.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import javax.mail.internet.MimeMessage;
import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class RoleController {
    @Autowired
    RoleRepository repository;

    @Autowired
    SectionRepository sectionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private JavaMailSender sender;

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////        R E M O T E  S E R V I C E     //////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Suppose : SECTION DATABASE
    public List<SectionBody> SectionDatabase() {
        List<SectionBody> sectionBodies = new ArrayList<>();
        sectionBodies.add(new SectionBody(1,"section1", "0"));
        sectionBodies.add(new SectionBody(2,"section2","0"));
        sectionBodies.add(new SectionBody(3,"section3","1"));
        sectionBodies.add(new SectionBody(4,"section4","0"));
        sectionBodies.add(new SectionBody(5,"section5","0"));
        sectionBodies.add(new SectionBody(6,"section6","1"));
        sectionBodies.add(new SectionBody(7,"section7","0"));
        sectionBodies.add(new SectionBody(8,"section8","0"));
        sectionBodies.add(new SectionBody(9,"section9","1"));
        sectionBodies.add(new SectionBody(10,"section10","0"));
        sectionBodies.add(new SectionBody(11,"section11","0"));
        sectionBodies.add(new SectionBody(12,"section12","1"));
        sectionBodies.add(new SectionBody(13,"section13","0"));
        sectionBodies.add(new SectionBody(14,"section14","0"));
        sectionBodies.add(new SectionBody(15,"section15","1"));
        return sectionBodies;
    }
    // Suppose : USER DATABASE
    public List<UserBody> UserDatabase() {
        List<UserBody> userBodies = new ArrayList<>();
        userBodies.add(new UserBody(1, "user1", "yang2413@outlook.com","1"));
        userBodies.add(new UserBody(2, "user2", "yang2413@outlook.com","1"));
        userBodies.add(new UserBody(3, "user3", "yang2413@outlook.com","1"));
        userBodies.add(new UserBody(4, "user4", "yang2413@outlook.com","1"));
        userBodies.add(new UserBody(5, "user5", "yang2413@outlook.com","1"));
        userBodies.add(new UserBody(6, "user6", "yang2413@outlook.com","1"));
        userBodies.add(new UserBody(7, "user7", "yang2413@outlook.com","1"));
        userBodies.add(new UserBody(8, "user8", "yang2413@outlook.com","1"));
        userBodies.add(new UserBody(9, "user9", "yang2413@outlook.com","1"));
        userBodies.add(new UserBody(10, "user10", "yang2413@outlook.com","1"));
        userBodies.add(new UserBody(11, "user11", "yang2413@outlook.com","1"));
        userBodies.add(new UserBody(12, "user12", "yang2413@outlook.com","1"));
        return userBodies;
    }



    // Suppose : Section Service: Added sections
    public List<SectionBody> SectionService(List<Section> sectionList)
    {
        // suppose db: getAll()
        List<SectionBody> getAllDataList = SectionDatabase();
        List<SectionBody> sectionBodies = new ArrayList<>();
        for (int i = 0; i < sectionList.size(); i++)
        {
            for (int j = 0; j < getAllDataList.size(); j++)
            {
                if (sectionList.get(i).getSectionid() == getAllDataList.get(j).getId())
                {
                    sectionBodies.add(getAllDataList.get(j));
                }
            }
        }

        return  sectionBodies;
    }
    // Suppose : Section Service: New sections
    public List<SectionBody> NewSectionService(List<Section> sectionList)
    {
        // suppose db: getAll()
        List<SectionBody> getAllDataList = SectionDatabase();

        for (int i = 0; i < sectionList.size(); i++)
        {
            for (int j = 0; j < getAllDataList.size(); j++)
            {
                if (sectionList.get(i).getSectionid() == getAllDataList.get(j).getId())
                {
                    getAllDataList.remove(getAllDataList.get(j));
                }

            }
        }

        return  getAllDataList;
    }




    // Suppose : Section User: Added users
    public List<UserBody> UserService(List<User> userList)
    {
        // suppose db: getAll()
        List<UserBody> getAllDataList = UserDatabase();
        List<UserBody> userBodies = new ArrayList<>();
        for (int i = 0; i < userList.size(); i++)
        {
            for (int j = 0; j < getAllDataList.size(); j++)
            {
                if (userList.get(i).getUserid() == getAllDataList.get(j).getId())
                {
                    userBodies.add(getAllDataList.get(j));
                }
            }
        }

        return  userBodies;
    }
    // Suppose : Section User: New users
    public List<UserBody> NewUserService(List<User> userList)
    {
        // suppose db: getAll()
        List<UserBody> getAllDataList = UserDatabase();

        for (int i = 0; i < userList.size(); i++)
        {
            for (int j = 0; j < getAllDataList.size(); j++)
            {
                if (userList.get(i).getUserid() == getAllDataList.get(j).getId())
                {
                    getAllDataList.remove(getAllDataList.get(j));
                }

            }
        }

        return  getAllDataList;
    }
    public String GetUserEmail(int id){
        // suppose db: getAll()
        List<UserBody> getAllDataList = UserDatabase();

        String strEmail = "";
        for (int j = 0; j < getAllDataList.size(); j++)
        {
            if (id == getAllDataList.get(j).getId())
            {
                strEmail = getAllDataList.get(j).getEmail();
            }
        }

        return  strEmail;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

    private boolean isbActionState(boolean bActionState, long id, String strAction) {
        Optional<Role> roleData = repository.findById(id);
        if (roleData.isPresent()) {
            Role _role = roleData.get();
            _role.setAction(strAction);
            repository.save(_role);
            bActionState = true;
        }
        return bActionState;
    }










//////////////////////////// Main Controller (Role, Section, User) /////////////////////////////////////
    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        System.out.println("Get All Roles...");

        List<Role> roles = new ArrayList<>();
        repository.findAll().forEach(roles::add);

        return roles;
    }
    @PostMapping(value = "/roles/create")
    public Role postRole(@RequestBody Role role) {

        Role _role = repository.save(new Role(role.getName(), role.getDescription(), "0"));
        return _role;
    }
    @DeleteMapping("/roles/{id}")
    public ResponseEntity<String> deleteRole(@PathVariable("id") long id) {
        System.out.println("Delete Role with ID = " + id + "...");

        // Delete in role db
        repository.deleteById(id);
        // Delete in section db
        List<Section> sections = sectionRepository.findByRoleid(id);
        for (int s = 0; s < sections.size(); s++){
            sectionRepository.deleteById(sections.get(s).getId());
        }
        // Delete in user db
        List<User> users = userRepository.findByRoleid(id);
        for (int u = 0; u < users.size(); u++){
            userRepository.deleteById(users.get(u).getId());
        }

        return new ResponseEntity<>("Role has been deleted!", HttpStatus.OK);
    }
    @DeleteMapping("/roles/delete")
    public ResponseEntity<String> deleteAllRoles() {
        System.out.println("Delete All Roles...");

        repository.deleteAll();

        return new ResponseEntity<>("All roles have been deleted!", HttpStatus.OK);
    }
    @GetMapping(value = "roles/name/{name}")
    public List<Role> findByName(@PathVariable String name) {

        List<Role> roles = repository.findByName(name);
        return roles;
    }
    @PutMapping("/roles/{id}")
    public ResponseEntity<Role> updateRole(@PathVariable("id") long id, @RequestBody Role role) {

        System.out.println("Update Role with ID = " + id + "...");

        Optional<Role> roleData = repository.findById(id);

        List<Section> sections = sectionRepository.findByRoleid(id);
        List<SectionBody> sectionBodyList = SectionService(sections);

        boolean bActionState = false;
        for (int i = 0; i < sectionBodyList.size(); i++){
            if (!bActionState && sectionBodyList.get(i).getAction().equals("1"))
                bActionState = isbActionState(bActionState, id, "1");
        }

        if (roleData.isPresent()) {
            Role _role = roleData.get();
            _role.setName(role.getName());
            _role.setDescription(role.getDescription());
            if (bActionState) _role.setAction("1");
            else _role.setAction("0");
            return new ResponseEntity<>(repository.save(_role), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/roles/{id}")
    public List<Role> findByUserid(@PathVariable("id") long id)
    {
        System.out.println("Getting Roles by User id");

        List<Role> roleList = new ArrayList<>();
        List<User> userList = userRepository.findByUserid(id);
        for (int i = 0; i < userList.size(); i++)
        {
            Optional<Role> roles = repository.findById(userList.get(i).getRoleid());

            if(roles.isPresent()) {
                roleList.add(roles.get());
            }
        }

        return roleList;
    }
    @GetMapping("/roles/un/{id}")
    public List<Role> newRolesByUserid(@PathVariable("id") long id)
    {
        System.out.println("Getting new Roles by User id");

        List<Role> roleList = null;
        List<User> userList = userRepository.findByUserid(id);

        List<Role> roles = new ArrayList<>();
        repository.findAll().forEach(roles::add);

        for (int i = 0; i < userList.size(); i++)
        {
            for (int j = 0; j < roles.size(); j++)
            {
                if (userList.get(i).getRoleid() == roles.get(j).getId())
                    roles.remove(roles.get(j));
            }
        }

        return roles;
    }
    @PostMapping("/roles/add/{id}")
    public String setAddRoles(@PathVariable("id") long id, @RequestBody Integer[] addedIdArray)
    {
        System.out.println("Roles Add");

        User _user = null;
        String msg = "";
        String subject = "Role Management";
        String sendingEmail = GetUserEmail((int)id);
        for (int i = 0; i < addedIdArray.length; i++)
        {
            Optional<Role> roleData = repository.findById(Long.valueOf(addedIdArray[i]));
            if (roleData.isPresent()) {
                Role _role = roleData.get();
                msg = _role.getName();
            } else {
                msg = "UnKnown";
            }
            _user = userRepository.save(new User(addedIdArray[i], id));
            try {
                sendEmail(subject, "Added new role: " + msg, sendingEmail);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return "ok";
    }

    @PostMapping("/roles/remove/{id}")
    public String setRemoveRoles(@PathVariable("id") long id, @RequestBody Integer[] removedIdArray)
    {
        System.out.println("Roles Remove");
        List<User> userList = new ArrayList<>();
        String msg = "";
        String subject = "Role Management";
        String sendingEmail = GetUserEmail((int) id);
        for (int i = 0; i < removedIdArray.length; i++)
        {
            Optional<Role> roleData = repository.findById(Long.valueOf(removedIdArray[i]));
            if (roleData.isPresent()) {
                Role _role = roleData.get();
                msg = _role.getName();
            } else {
                msg = "Unknown";
            }
            userList = userRepository.findByUseridAndRoleid(id, Long.valueOf(removedIdArray[i]));
            userRepository.deleteById(userList.get(0).getId());
            try {
                sendEmail(subject, "Removed the role: " + msg, sendingEmail);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return "ok";
    }







    ////////////////////////// Section //////////////////////////////////////

    @GetMapping("/sections/{id}")
    public List<SectionBody> getSections (@PathVariable("id") long id)
    {
        System.out.println("Get All Sections...");

        List<Section> sections = sectionRepository.findByRoleid(id);
        List<SectionBody> sectionBodyList = SectionService(sections);
        return sectionBodyList;
    }
    @GetMapping("/sections/un/{id}")
    public List<SectionBody> getUnSections (@PathVariable("id") long id)
    {
        System.out.println("Get New Sections...");

        List<Section> sections = sectionRepository.findByRoleid(id);
        List<SectionBody> sectionBodyList = NewSectionService(sections);
        return sectionBodyList;
    }
    // Add sections in "section" database
    @PostMapping("/sections/add/{id}")
    public Role setAddSections(@PathVariable("id") long id, @RequestBody Integer[] addedIdArray) {
        System.out.println("Section Add");

        List<SectionBody> sectionBodyList = SectionDatabase();

        boolean bActionState = false;
        Section _section = null;
        for (int i = 0; i < addedIdArray.length; i++){
            _section = sectionRepository.save(new Section(id, addedIdArray[i]));
            if (!bActionState && sectionBodyList.get(i).getAction().equals("1"))
                bActionState = isbActionState(false, id, "1");
        }
        Optional<Role> roleData = repository.findById(id);
        return roleData.get();
    }

    @PostMapping("/sections/remove/{id}")
    public Role setRemoveSections(@PathVariable("id") long id, @RequestBody Integer[] removedIdArray) {
        System.out.println("Section Remove");

        boolean bActState = false;

        List<Section> sectionList = new ArrayList<>();
        for (int i = 0; i < removedIdArray.length; i++){
            sectionList = sectionRepository.findBySectionidAndRoleid(Long.valueOf(removedIdArray[i]), id);
            sectionRepository.deleteById(sectionList.get(0).getId());
        }

        List<Section> sections = sectionRepository.findByRoleid(id);
        List<SectionBody> sectionBodies = SectionService(sections);

        for (int j = 0; j < sectionBodies.size(); j++)
        {
            if (sectionBodies.get(j).getAction().equals("1"))
            {
                bActState = true; break;
            }
        }
        if (bActState)
            isbActionState(true, id, "1");
        else
            isbActionState(false, id, "0");
        Optional<Role> roleData = repository.findById(id);
        return roleData.get();
    }







    //////////////////////////////////////////////////////////////////////////////////////////////
    @GetMapping("/users")
    public List<UserBody> getAllUsers()
    {
        System.out.println("Getting all users");
        return UserDatabase();
    }
    @GetMapping("/users/{id}")
    public List<UserBody> getUsers (@PathVariable("id") long id)
    {
        System.out.println("Get All Users...");

        List<User> users = userRepository.findByRoleid(id);
        List<UserBody> userBodyList = UserService(users);

        System.out.println(userBodyList);

        return userBodyList;
    }
    @GetMapping("/users/un/{id}")
    public List<UserBody> getUnUsers (@PathVariable("id") long id)
    {
        System.out.println("Get New Users...");

        List<User> users = userRepository.findByRoleid(id);
        List<UserBody> userBodyList = NewUserService(users);

        System.out.println(userBodyList);

        return userBodyList;
    }
    // Add sections in "section" database
    @PostMapping("/users/add/{id}")
    public String setAddUsers(@PathVariable("id") long id, @RequestBody Integer[] addedIdArray) {
        System.out.println("User Add");
        User _user = null;

        Optional<Role> roleData = repository.findById(id);
        String msg = "";
        String subject = "Role Management";
        if (roleData.isPresent()) {
            Role _role = roleData.get();
            msg = _role.getName();
        } else {
            msg = "Unknown";
        }

        for (int i = 0; i < addedIdArray.length; i++){
            _user = userRepository.save(new User(id, addedIdArray[i]));
            try {
                sendEmail(subject, "Added new role: " + msg, GetUserEmail(addedIdArray[i]));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return "ok";
    }
    @PostMapping("/users/remove/{id}")
    public String setRemoveUsers(@PathVariable("id") long id, @RequestBody Integer[] removedIdArray) {
        System.out.println("User Remove");
        List<User> userList = new ArrayList<>();

        Optional<Role> roleData = repository.findById(id);
        String msg = "";
        String subject = "Role Management";
        if (roleData.isPresent()) {
            Role _role = roleData.get();
            msg = _role.getName();
        } else {
            msg = "Unknown";
        }

        for (int i = 0; i < removedIdArray.length; i++){
            userList = userRepository.findByUseridAndRoleid(Long.valueOf(removedIdArray[i]), id);
            userRepository.deleteById(userList.get(0).getId());
            try {
                sendEmail(subject, "Removed the role: " + msg, GetUserEmail(removedIdArray[i]));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return "OK";
    }







    /// To send email
    public void sendEmail(String subject, String msg, String to) throws Exception{
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setTo(to);
        helper.setText(msg);
        helper.setSubject(subject);

        sender.send(message);
    }
}
