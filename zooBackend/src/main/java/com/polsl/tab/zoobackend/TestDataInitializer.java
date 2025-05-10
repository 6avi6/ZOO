package com.polsl.tab.zoobackend;

import com.polsl.tab.zoobackend.model.Role;
import com.polsl.tab.zoobackend.model.User;
import com.polsl.tab.zoobackend.model.UserWorkSchedule;
import com.polsl.tab.zoobackend.model.WorkSchedule;
import com.polsl.tab.zoobackend.repository.UserRepository;

import com.polsl.tab.zoobackend.repository.WorkScheduleRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TestDataInitializer {

    private final UserRepository userRepository;
    private final WorkScheduleRepository workScheduleRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        if (userRepository.count() == 0) {
            for (Role role : Role.values()) {
                String roleLower = role.name().toLowerCase();
                String username = roleLower;
                String password = roleLower;
                String encodedPassword = passwordEncoder.encode(password);

                User user = new User(username, encodedPassword, role);
                userRepository.save(user);
            }
        }

        if (workScheduleRepository.count() == 0) {
            List<User> users = userRepository.findAll();
            if (users.isEmpty()) return; // No users - we don't generate schedules

            LocalDate startDate = LocalDate.now(); // Today
            int daysToGenerate = 7; // All week

            // Definition of three shifts
            LocalTime[][] shifts = {
                    { LocalTime.of(6, 0), LocalTime.of(14, 0) },
                    { LocalTime.of(14, 0), LocalTime.of(22, 0) },
                    { LocalTime.of(22, 0), LocalTime.of(6, 0) }
            };

            int userIndex = 0;

            for (int i = 0; i < daysToGenerate; i++) {
                LocalDate currentDate = startDate.plusDays(i);

                for (int shiftIndex = 0; shiftIndex < shifts.length; shiftIndex++) {
                    WorkSchedule schedule = new WorkSchedule();
                    schedule.setUserWorkSchedule(new ArrayList<>());

                    LocalDateTime shiftStart = currentDate.atTime(shifts[shiftIndex][0]);
                    LocalDateTime shiftEnd = (shiftIndex == 2)
                            ? currentDate.plusDays(1).atTime(shifts[shiftIndex][1]) // night shift ends the next day
                            : currentDate.atTime(shifts[shiftIndex][1]);

                    schedule.setShiftStart(shiftStart);
                    schedule.setShiftEnd(shiftEnd);

                    User user = users.get(userIndex % users.size());
                    UserWorkSchedule uws = new UserWorkSchedule();
                    uws.setUser(user);
                    uws.setWorkSchedule(schedule);
                    schedule.getUserWorkSchedule().add(uws);

                    workScheduleRepository.save(schedule);

                    userIndex++;
                }
            }
        }
    }
}
