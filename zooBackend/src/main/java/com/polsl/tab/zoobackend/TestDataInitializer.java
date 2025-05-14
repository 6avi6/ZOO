package com.polsl.tab.zoobackend;

import com.polsl.tab.zoobackend.dto.enclosure.EnclosureRequest;
import com.polsl.tab.zoobackend.dto.foodType.FoodTypeRequest;
import com.polsl.tab.zoobackend.mapper.EnclosureMapper;
import com.polsl.tab.zoobackend.mapper.FoodTypeMapper;
import com.polsl.tab.zoobackend.model.*;
import com.polsl.tab.zoobackend.repository.*;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class TestDataInitializer implements ApplicationRunner {

    private final UserRepository userRepository;
    private final WorkScheduleRepository workScheduleRepository;
    private final EnclosureRepository enclosureRepository;
    private final FoodTypeRepository foodTypeRepository;
    private final AnimalRepository animalRepository;
    private final FeedingRepository feedingRepository;
    private final PasswordEncoder passwordEncoder;
    private final EnclosureMapper enclosureMapper;
    private final FoodTypeMapper foodTypeMapper;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        seedUsers();
        seedWorkSchedules();
        seedEnclosures();
        seedFoodTypes();
        seedAnimals();
        seedFeedings();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            for (Role role : Role.values()) {
                String roleLower = role.name().toLowerCase();
                User user1 = new User(roleLower, passwordEncoder.encode(roleLower), role);
                userRepository.save(user1);
                String username = "string" +role.name().toUpperCase().charAt(0);
                User user2 = new User(username, passwordEncoder.encode(username), role);
                userRepository.save(user2);
            }
        }
    }

    private void seedWorkSchedules() {
        if (workScheduleRepository.count() == 0) {
            List<User> users = userRepository.findAll();
            if (!users.isEmpty()) {
                LocalDate start = LocalDate.now();
                LocalTime[][] shifts = { {LocalTime.of(6,0),LocalTime.of(14,0)}, {LocalTime.of(14,0),LocalTime.of(22,0)}, {LocalTime.of(22,0),LocalTime.of(6,0)} };
                int userIndex = 0;
                for (int d=0; d<7; d++) {
                    LocalDate date = start.plusDays(d);
                    for (LocalTime[] shift : shifts) {
                        WorkSchedule ws = new WorkSchedule();
                        LocalTime end = shift[1];
                        ws.setShiftStart(date.atTime(shift[0]));
                        ws.setShiftEnd(shift[0].isAfter(shift[1]) ? date.plusDays(1).atTime(end) : date.atTime(end));
                        User u = users.get(userIndex++ % users.size());
                        UserWorkSchedule uws = new UserWorkSchedule();
                        uws.setUser(u); uws.setWorkSchedule(ws);
                        ws.setUserWorkSchedule(new ArrayList<>()); ws.getUserWorkSchedule().add(uws);
                        workScheduleRepository.save(ws);
                    }
                }
            }
        }
    }

    private void seedEnclosures() {
        if (enclosureRepository.count() == 0) {
            List<Enclosure> list = List.of(
                    enclosureMapper.toEntity(new EnclosureRequest("Forest",true,"High",22.0,5)),
                    enclosureMapper.toEntity(new EnclosureRequest("Savannah",false,"Medium",30.0,5)),
                    enclosureMapper.toEntity(new EnclosureRequest("Desert",false,"Low",40.0,5)),
                    enclosureMapper.toEntity(new EnclosureRequest("Wetland",true,"Medium",25.0,5)),
                    enclosureMapper.toEntity(new EnclosureRequest("Mountain",false,"High",15.0,5))
            );
            enclosureRepository.saveAll(list);
        }
    }

    private void seedFoodTypes() {
        if (foodTypeRepository.count() == 0) {
            List<FoodType> list = List.of(
                    foodTypeMapper.toEntity(new FoodTypeRequest("Herbivore Mix","Mixed plants")),
                    foodTypeMapper.toEntity(new FoodTypeRequest("Carnivore Chow","High protein")),
                    foodTypeMapper.toEntity(new FoodTypeRequest("Omnivore Blend","Balanced diet")),
                    foodTypeMapper.toEntity(new FoodTypeRequest("Fruit Feast","Fresh fruits")),
                    foodTypeMapper.toEntity(new FoodTypeRequest("Seed Selection","Seeds and nuts"))
            );
            foodTypeRepository.saveAll(list);
        }
    }

    private void seedAnimals() {
        if (animalRepository.count() == 0) {
            List<User> users = userRepository.findAll();
            if (!users.isEmpty()) {
                List<Enclosure> encls = enclosureRepository.findAll();
                List<Animal> animals = new ArrayList<>();
                int userIndex = 0;
                for (int i = 1; i <= 10; i++) {
                    Animal a = new Animal();
                    a.setName("Animal" + i);
                    a.setBirthDate(LocalDate.now().minusYears(i));
                    a.setSpecies(Species.values()[i % Species.values().length]);
                    a.setCondition("Good");
                    a.setSex(i % 2 == 0 ? "Male" : "Female");
                    a.setWeight(10.0 * i);
                    a.setEnclosure(encls.get(i % encls.size()));
                    a.setVeterinaryVisits(null);

                    User u1 = users.get(userIndex++ % users.size());
                    User u2 = users.get(userIndex++ % users.size());

                    a.getAssignedUsers().add(u1);
                    a.getAssignedUsers().add(u2);

                    u1.getAssignedAnimals().add(a);
                    u2.getAssignedAnimals().add(a);

                    animals.add(a);
                }
                animalRepository.saveAll(animals);
            }
        }
    }

    private void seedFeedings() {
        if (feedingRepository.count() == 0) {
            List<Animal> ans = animalRepository.findAll();
            List<FoodType> fts = foodTypeRepository.findAll();
            int userIndex = 0;

            for (int i = 0; i < 10; i++) {
                Feeding f = new Feeding();
                f.setFeedingTime(LocalTime.of(8 + i, 0));
                f.setIsCompleted(false);
                f.setFoodType(fts.get(i % fts.size()));

                Animal a = ans.get(i % ans.size());

                Set<Animal> animals = new HashSet<>();
                animals.add(a);
                f.setAnimals(animals);

                Set<User> feedingUsers = new HashSet<>(a.getAssignedUsers());
                f.setFeedingUsers(feedingUsers);

                feedingUsers.forEach(u -> u.getFeedings().add(f));

                feedingRepository.save(f);
            }
        }
    }
}
